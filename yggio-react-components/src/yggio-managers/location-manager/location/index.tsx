/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {useQueryClient} from '@tanstack/react-query';
import {
  compose,
  pick,
  gt,
  lt,
  eq,
  filter,
} from 'lodash/fp';
import {NextRouter} from 'next/router';
import {Icon} from 'react-icons-kit';
import {ic_arrow_back as backIcon} from 'react-icons-kit/md/ic_arrow_back';
import state from './state';
import ContainerBox from '../../../components/container-box';
import {withLanguage, withReselect, withState} from '../../../hocs';
import {CenterContentContainer} from '../../../global/styled';
import {Layer, Control, Table} from './components';
import selectors from './selectors';
import {getPannedGeometry, getZoomedGeometry, unscaleCenteredCoord} from './utils';
import Spinner from '../../../components/spinner';
import {BackButtonText, BackButtonWrapper, SpinnerWrapper} from './styled';
import Button from '../../../components/button';
import {devicesApi, locationsApi} from '../../../api';
import {Layer as ILayer, LayerItem, Location} from '../../../types';

interface Geometry {
  left: number;
  top: number;
}

interface LocationProps {
  children: React.ReactNode,
  locationId: string;
  layerId: string;
  placedItems: object;
  layerGeometry: {
    scale: number;
  };
  blueprintImageSize: object;
  layerGeometries: Record<string, object>;
  openedLayers: object;
  movingDeviceItem: LayerItem;
  isRemovingDevice: boolean;
  isInDevicePlacementMode: boolean;
  selectedLayer: ILayer;
  router: NextRouter;
  t(key: string): string;
  toggleLayer(): void;
  setDevicePlacementMode(isInDevicePlacementMode: boolean): void;
  resetLayerGeometry(layerId: string): void;
  reportImageSize(imageSrc: string, size: object): void;
  endMovingDeviceItem(): void;
  setIsRemovingDevice(isRemovingDevice: boolean): void;
  beginMovingDeviceItem(deviceItem: LayerItem): void;
  getPannedGeometry(coordinate: object, geometry: object): void;
  setLayerGeometry(_id: string, geometry: object): void;
  updateMovingDeviceItem(
    location: Location,
    movingDeviceItemId: string,
    geometry: Geometry,
    unzoomedCoord: object,
  ): void;
}

const BaseLocation = (props: LocationProps) => {

  /// ////////////////////////
  //
  // HOOKS
  //
  /// ///////////////////////

  const queryClient = useQueryClient();

  const useUpdateLocation = locationsApi.useUpdateLocation(queryClient);

  const location = locationsApi.useLocationQuery(props.locationId);
  const devices = devicesApi.useDevicesQuery({
    params: {},
    select: React.useCallback(
      data => data,
      [],
    ),
  });

  /// ////////////////////////
  //
  // EVENTS
  //
  /// ///////////////////////

  const handleMouseUp = () => {
    if (location.data && (props.movingDeviceItem && !props.isRemovingDevice)) {
      const updates = _.map(props.selectedLayer.items, (item: LayerItem) => {
        if (eq(item._id, props.movingDeviceItem._id)) {
          return {...item, ...props.movingDeviceItem};
        }
        return item;
      });
      if (props.selectedLayer._id === _.get(location, 'data.defaultLayer._id')) {
        useUpdateLocation.mutate({
          ...location,
          defaultLayer: {
            ...location.data.defaultLayer,
            items: updates,
          },
        });
        props.endMovingDeviceItem();
      } else {
        const layerIndex = _.findIndex(location?.data?.layers, {_id: props.selectedLayer._id});
        const layers = location.data.layers.slice();
        layers[layerIndex] = {
          ...layers[layerIndex],
          items: updates,
        };
        useUpdateLocation.mutate({
          ...location.data,
          layers,
        });
        props.endMovingDeviceItem();
      }
    }
  };

  const handleOnPan = (panDetails: object) => {
    if (location.data) {
      if (!props.movingDeviceItem && !props.isInDevicePlacementMode) {
        const coordinate = pick(['x', 'y'], panDetails);
        const geometry = getPannedGeometry(coordinate, props.layerGeometry);
        props.setLayerGeometry(props.selectedLayer._id, geometry);
      }

      if (props.movingDeviceItem && props.movingDeviceItem._id) {
        const centeredPosition = pick(['top', 'left'], panDetails);
        const geometry = props.layerGeometries[location.data._id] || {x: 0, y: 0, scale: 1};
        const unzoomedCoord = unscaleCenteredCoord(
          centeredPosition,
          geometry,
        ) as {y: number, x: number};

        props.updateMovingDeviceItem(
          location.data,
          props.movingDeviceItem._id,
          {left: unzoomedCoord.x, top: unzoomedCoord.y},
          unzoomedCoord,
        );
      }
    }
  };

  const handleOnZoom = (zoomDiff: object) => {
    const allowZoom = gt(props.layerGeometry.scale, 0.3) && lt(props.layerGeometry.scale, 1.7);
    if (!props.movingDeviceItem && allowZoom) {
      const geometry = getZoomedGeometry(zoomDiff, props.layerGeometry);
      props.setLayerGeometry(props.selectedLayer._id, geometry);
    }
  };

  const handleOnLoad = (imageSrc: string, size: object) => {
    if (!eq(size, props.blueprintImageSize)) {
      props.reportImageSize(imageSrc, size);
    }
  };

  const onLoad = (evt: React.ChangeEvent<HTMLImageElement>) => {
    const imageSize = {
      width: evt.target.naturalWidth,
      height: evt.target.naturalHeight,
    };
    handleOnLoad(props.selectedLayer.image, imageSize);
  };

  const onBeginMovingDevice = (deviceItem: LayerItem) => () => {
    if (props.isInDevicePlacementMode) {
      props.beginMovingDeviceItem(deviceItem);
    }
  };

  const onEndMovingDevice = () => {
    if (props.movingDeviceItem) {
      const items = filter(
        item => !eq(item._id, props.movingDeviceItem._id),
        props.selectedLayer.items
      );
      if (props.layerId === location?.data?.defaultLayer._id) {
        useUpdateLocation.mutate({
          ...location,
          defaultLayer: {...location?.data?.defaultLayer, items}
        });
      } else {
        const layerIndex = _.findIndex(location?.data?.layers, {_id: props.layerId});
        const layers = location?.data?.layers.slice();
        if (layers) {
          layers[layerIndex] = {...layers[layerIndex], items};
        }
        useUpdateLocation.mutate({...location, layers});
      }
      props.endMovingDeviceItem();
    }
  };

  const onRemovingDevice = () => {
    if (props.movingDeviceItem) {
      props.setIsRemovingDevice(true);
    }
  };

  const onNotRemovingDevice = () => {
    props.setIsRemovingDevice(false);
  };

  interface ZoomClients {
    clientX: number;
    clientY: number;
  }

  const handleZoomOut = ({clientX, clientY}: ZoomClients) => {
    const position = {
      left: clientX,
      top: clientY,
    };
    handleOnZoom({...position, zoom: -250});
  };

  const handleZoomIn = ({clientX, clientY}: ZoomClients) => {
    const position = {
      left: clientX,
      top: clientY,
    };
    handleOnZoom({...position, zoom: 250});
  };

  const handleResetLocation = () => {
    props.resetLayerGeometry(props.layerId);
  };

  const handlePlacementMode = () => {
    handleResetLocation();
    props.setDevicePlacementMode(!props.isInDevicePlacementMode);
  };

  const onClick = (id: string) => async () => (
    props.router.push(`/locations/${props.locationId}/${id}`)
  );

  /// ////////////////////////
  //
  // RENDERING
  //
  /// ///////////////////////

  if (location.isLoading || devices.isLoading) {
    return (
      <SpinnerWrapper>
        <Spinner size={40} />
      </SpinnerWrapper>
    );
  }

  if (location.error) {
    return (
      <CenterContentContainer>
        {location.error as string}
      </CenterContentContainer>
    );
  }

  return (
    <CenterContentContainer>
      <ContainerBox
        position={'relative'}
        display={'flex'}
        width={'20%'}
        height={'95vh'}
        flexDirection={'column'}
        margin={'10px'}
        includeMarginInHeight
        includeMarginInWidth
      >
        <BackButtonWrapper onClick={async () => props.router.push('/locations')}>
          <Icon icon={backIcon as object} size={14} />
          <BackButtonText>
            {_.capitalize(props.t('labels.backToLocations'))}
          </BackButtonText>
        </BackButtonWrapper>
        <h2>{_.get(props, 'currentLocation.name')}</h2>
        <i>{_.get(props, 'currentLocation.description')}</i>
        <Button
          color={'green'}
          ghosted
          margin={'10px'}
          content={'New layer'}
          onClick={async () => props.router.push(`/locations/${props.locationId}/new`)}
        />
        <Table
          toggleLayer={props.toggleLayer}
          openedLayers={props.openedLayers}
          devices={devices?.data}
          router={props.router}
          currentLocation={location}
          onClick={onClick}
          items={location?.data?.layers}
        />
      </ContainerBox>
      <ContainerBox
        position={'relative'}
        display={'flex'}
        width={'80%'}
        height={'95vh'}
        flexDirection={'column'}
        margin={'10px'}
        includeMarginInHeight
        includeMarginInWidth
        style={{overflow: 'hidden'}}
      >
        <Control
          handleResetLocation={handleResetLocation}
          handlePlacementMode={handlePlacementMode}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
        />

        <Layer
          {...props}
          devices={devices?.data}
          layerGeometry={props.layerGeometry}
          placedItems={props.placedItems}
          onMouseUp={handleMouseUp}
          onPan={handleOnPan}
          onZoom={handleOnZoom}
          onLoad={onLoad}
          onBeginMovingDevice={onBeginMovingDevice}
          onEndMovingDevice={onEndMovingDevice}
          onRemovingDevice={onRemovingDevice}
          onNotRemovingDevice={onNotRemovingDevice}
        />
      </ContainerBox>
    </CenterContentContainer>
  );
};

export default compose(
  withLanguage(),
  withState(state),
  withReselect(selectors),
)(BaseLocation);
