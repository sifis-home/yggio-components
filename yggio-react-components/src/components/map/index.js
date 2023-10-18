import React from 'react';
import _ from 'lodash';
import {compose} from 'lodash/fp';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import {
  LEAFLET_ATTRIBUTION,
  LEAFLET_URL,
} from '../../constants';

import {
  Markers,
  MapButtons,
} from './sub-components';

import state from './state';
import {withState} from '../../hocs';
import {
  MapWrapper,
  LeafletMap,
  StyledMessageBox,
} from './styled';
import {sanitizeItems, getBounds} from './utils';

const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  {ssr: false},
);
const LayerGroup = dynamic(
  () => import('react-leaflet').then(mod => mod.LayerGroup),
  {ssr: false},
);

const MarkersLayer = props => (
  <LayerGroup>
    <Markers
      viewOnly={props.viewOnly}
      router={props.router}
      movingMode={props.movingMode}
      URI={props.mapLayer.URI}
      items={props.mapLayer.items}
      saveMarker={props.mapLayer.saveMarker}
      markerShape={props.mapLayer.markerShape}
      setViewport={props.setViewport}
    />
  </LayerGroup>
);

MarkersLayer.propTypes = {
  router: PropTypes.object.isRequired,
  history: PropTypes.object,
  location: PropTypes.object,
  movingMode: PropTypes.bool,
  mapLayer: PropTypes.object,
};

const BasicMap = props => {
  const [autoZoom, setAutoZoom] = React.useState(true);
  const deviceItems = _.get(props, 'mapLayers.devices.items') || [];
  const locationItems = _.get(props, 'mapLayers.locations.items') || [];
  const allItems = _.concat(deviceItems, locationItems);
  const items = sanitizeItems(allItems);
  const bounds = getBounds(items);

  return (
    <MapWrapper
      height={props.height}
      width={props.width}
    >
      {props.movingMode && (
        <StyledMessageBox>
          <b>Moving mode activated</b>
        </StyledMessageBox>
      )}
      <MapButtons
        autoZoom={autoZoom}
        setAutoZoom={setAutoZoom}
        showGetLocation={props.showGetLocation}
        viewOnly={props.viewOnly}
        viewport={props.viewport}
        setViewport={props.setViewport}
        setMovingMode={props.setMovingMode}
        movingMode={props.movingMode}
      />
      <LeafletMap
        movingMode={props.movingMode}
        zoomControl={false}
        useFlyTo={false}
        center={props.viewport.center}
        zoom={props.viewport.zoom}
        minZoom={2}
        maxZoom={18}
        bounds={autoZoom && !_.isEmpty(bounds) ? bounds : null}
        maxBounds={[
          [-90, -180],
          [90, 180]
        ]}
        dragging
        onViewportChanged={viewport => {
          props.setViewport(viewport);
        }}
        onClick={evt => {
          if (props.onClick) props.onClick(evt);
        }}
      >
        <TileLayer
          attribution={LEAFLET_ATTRIBUTION}
          url={LEAFLET_URL}
        />
        {_.map(props.mapLayers, mapLayer => (
          <MarkersLayer
            viewOnly={props.viewOnly}
            router={props.router}
            key={mapLayer._id}
            mapLayer={mapLayer}
            movingMode={props.movingMode}
            setViewport={props.setViewport}
          />
        ))}
      </LeafletMap>
    </MapWrapper>
  );
};

BasicMap.propTypes = {
  // from top
  height: PropTypes.string,
  width: PropTypes.string,
  mapLayers: PropTypes.object,
  // from state
  movingMode: PropTypes.bool,
  setMovingMode: PropTypes.func,
  viewport: PropTypes.object,
  setViewport: PropTypes.func,
};

//
// data-processing & state stuff
//

const Map = compose(
  withState(state),
)(BasicMap);

Map.propTypes = {
  // from top
  viewOnly: PropTypes.bool,
  router: PropTypes.object.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  mapLayers: PropTypes.object,
  onClick: PropTypes.func
};

//
// exports
//

export default Map;
