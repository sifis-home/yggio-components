import _ from 'lodash';
import React, {createRef, useEffect, forwardRef} from 'react';
import ReactDOMServer from 'react-dom/server';
import {map, includes} from 'lodash/fp';
import {divIcon} from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import dynamic from 'next/dynamic';
import {
  BaseTooltip,
  MapItem,
  MapItemFooter,
  MapItemHeader,
  MarkerClusterIcon,
  MarkerIcon,
} from '../styled';
import Button from '../../button';
import {COLORS} from '../../../constants';
import {FlexColCenterMaxWidthWrapper} from '../../../global/styled';
import {getConfig} from '../../../yggio-config';
import deviceIcon from '../../../assets/icons/device-icon.png';
import locationIcon from '../../../assets/icons/location-icon.png';

const Marker = dynamic(
  () => import('react-leaflet').then(mod => mod.Marker),
  {ssr: false},
);
const Popup = dynamic(
  () => import('react-leaflet').then(mod => mod.Popup),
  {ssr: false},
);

const Markers = (
  {
    items,
    ...props
  }
) => {
  const createClusterIcon = cluster => {
    const markers = cluster.getAllChildMarkers();
    const statusColors = map(marker => marker.options.icon.options.color, markers);
    const markerShapes = map(marker => marker.options.icon.options.markerShape, markers);

    const shape = () => {
      if (includes('round', markerShapes)) {
        return 'round';
      }

      return 'square';
    };
    const color = () => {
      if (includes(COLORS.red, statusColors)) {
        return COLORS.red;
      }

      if (includes(COLORS.yellow, statusColors)) {
        return COLORS.yellow;
      }

      return COLORS.greenLight;
    };

    const html = ReactDOMServer.renderToString(
      <MarkerClusterIcon color={color()} shape={shape()}>
        <b>{cluster.getChildCount()}</b>
      </MarkerClusterIcon>
    );

    return divIcon({
      html,
      iconSize: null
    });
  };

  const markerItems = map(item => {
    const coords = item.latlng ? item.latlng : [item.lat, item.lng];

    if (_.isEmpty(_.compact(coords))) {
      return null;
    }

    return (
      <ItemMarkerWrapper
        item={item}
        {...props}
        coords={coords}
        key={item._id}
      />
    );
  }, items);
  const markers = _.compact(markerItems);

  return (
    <MarkerClusterGroup
      maxClusterRadius={50}
      iconCreateFunction={cluster => createClusterIcon(cluster)}
    >
      {markers}
    </MarkerClusterGroup>
  );
};
const BASE_ICONS = {
  locations: locationIcon,
  devices: deviceIcon
};
const ItemMarkerWrapper = ({movingMode, markerShape, ...rest}) => {
  const ref = createRef();
  const createIcon = (iconUrl, color) => {
    const iconSize = 30;
    const halfSize = iconSize / 2;

    const html = ReactDOMServer.renderToString(
      <MarkerIcon color={color} markerShape={markerShape}>
        <img
          src={iconUrl || BASE_ICONS[rest.URI]}
          alt="Map marker"
        />
      </MarkerIcon>
    );

    return divIcon({
      color,
      markerShape,
      iconSize: [iconSize, iconSize],
      popupAnchor: [5, -(halfSize + 2)],
      html
    });
  };

  useEffect(() => {
    if (ref.current.leafletElement) {
      const marker = ref.current.leafletElement;
      if (marker.dragging) {
        if (movingMode) {
          marker.dragging.enable();
        } else {
          marker.dragging.disable();
        }
      }
    }
  });
  return (
    <ItemMarker
      ref={ref}
      createIcon={createIcon}
      {...rest}
    />
  );
};

const ItemMarker = forwardRef(({
  icon,
  coords,
  status,
  createIcon,
  saveMarker,
  URI,
  router,
  item,
  ...rest
}, ref) => {
  const color = status ? status.color : COLORS.greenLight;
  return (
    <Marker
      ref={ref}
      icon={createIcon(icon, color)}
      position={coords}
      onDragEnd={({target: {_latlng: {lat, lng}}}) => {
        const data = {...item, lat, lng};
        if (URI === 'locations') {
          saveMarker(data);
        }
        if (URI === 'devices') {
          saveMarker({deviceId: data._id, updates: data});
        }
      }}
    >
      <MarkerPopup
        layerId={_.get(item, 'defaultLayer._id')}
        router={router}
        name={item.name}
        _id={item._id}
        status={status}
        URI={URI}
        alone={item.alone}
        latlng={item.latlng || [item.lat, item.lng]}
        setViewport={rest.setViewport}
      />
    </Marker>
  );
});

ItemMarker.displayName = 'va';

const MarkerPopup = (
  {
    name,
    latlng,
    _id,
    status,
    URI,
    router,
    alone,
    setViewport
  }
) => (
  <>
    <Popup autoPan={false}>
      <MapItem>
        {
          name &&
            <MapItemHeader>
              {_.truncate(name, {length: '20'})}
            </MapItemHeader>
        }
        <MapItemFooter>
          <FlexColCenterMaxWidthWrapper>

            {
              !alone &&
                <Button
                  color={'green'}
                  margin={'10px'}
                  onClick={() => {
                    if (URI === 'devices') {
                      return router.push(`/${URI}/${_id}/general-info`);
                    }

                    if (URI === 'locations') {
                      window.open(`http://${getConfig().domain}/${'location-manager'}/${name}`, '_blank');
                    // TODO: enable when LM2 is ready:
                    // return router.push(`/${URI}/${_id}/${layerId}`);
                    }
                  }}
                  content={'View'}
                />
            }
            <Button
              color={'green'}
              onClick={() => {
                setViewport({
                  center: latlng,
                  zoom: 14
                });
              }}
              content={'Focus'}
            />
          </FlexColCenterMaxWidthWrapper>
        </MapItemFooter>
      </MapItem>
    </Popup>
    {status &&
      <BaseTooltip
        direction='right'
        offset={[20, 0]}
        permanent
      >
        {_.map(status.text, (text, index) => <span key={index}> {text} </span>)}
      </BaseTooltip>}
  </>
);

export default Markers;
