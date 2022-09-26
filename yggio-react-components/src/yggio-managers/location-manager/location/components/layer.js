/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React, {Fragment} from 'react';
import {
  map,
  getOr,
  eq,
} from 'lodash/fp';
import _ from 'lodash';
import ResizeObserver from 'react-resize-observer';
import {
  LayerContainer,
  LayerSpriteStyled,
  DeviceItemWrapperStyled,
  DeviceItemSpriteStyled,
  ValueDisplay
} from '../styled';
import defaultLayerImg from '../../../../assets/images/defaults/blueprint.jpg';
import {Popup, RemovalZone} from './';
import InteractiveLayer from '../../../../components/interactive-layer';
import {getBlueprintImageUrl} from '../../../../utils';

const Layer = props => {
  return (
    <LayerContainer>
      <ResizeObserver
        onResize={props.resizeBackground}
        onPosition={props.resizeBackground}
      />
      <InteractiveLayer
        boundingRect={props.backgroundDimensions}
        onPan={props.onPan}
        onZoom={props.onZoom}
        onMouseUp={props.onMouseUp}
      >
        <LayerSpriteStyled
          src={getBlueprintImageUrl(_.get(props.selectedLayer, 'image')) || defaultLayerImg}
          alt={props.alt}
          parentDimensions={props.backgroundDimensions}
          geometry={props.layerGeometry}
          width={getOr(300, 'width', props.imageSizes[_.get(props, 'selectedLayer.image')])}
          height={getOr(300, 'height', props.imageSizes[_.get(props, 'selectedLayer.image')])}
          onLoad={props.onLoad}
        />

        {map(deviceItem => (
          <Fragment key={deviceItem._id}>
            <DeviceItemWrapperStyled
              onMouseDown={props.onBeginMovingDevice(deviceItem)}
              width={34}
              height={34}
              parentDimensions={props.backgroundDimensions}
              geometry={props.layerGeometry}
              deviceItem={deviceItem}
            >
              <DeviceItemSpriteStyled
                isMovable={props.isMovable}
                isGrabbed={props.isGrabbed}
                deviceItem={deviceItem}
                parentDimensions={props.backgroundDimensions}
                geometry={props.layerGeometry}
                width={34}
                height={34}
                onClick={() => {
                  if (!props.isInDevicePlacementMode) {
                    props.openDevicePopup(deviceItem.deviceId);
                  }
                }}
                onMouseUp={props.onMouseUp}
              />
              {props.valueDisplayText && <ValueDisplay>{props.valueDisplayText}</ValueDisplay>}
            </DeviceItemWrapperStyled>

            {eq(props.popupDeviceId, deviceItem.deviceId) && (
              <Popup
                devices={props.devices}
                parentDimensions={props.backgroundDimensions}
                geometry={props.layerGeometry}
                deviceItem={deviceItem}
                expandDevice={props.expandDevice}
                currentLayerId={props.currentLayerId}
                setBlueprintShowsDevices={props.setBlueprintShowsDevices}
                toggleLayerMenu={props.toggleLayerMenu}
                // values={props.currentLayerDevices[props.popupDeviceId]}
                closeDevicePopup={props.closeDevicePopup}
                showValueDisplay={props.showValueDisplay}
                currentLayer={props.currentLocation}
              />
            )}

          </Fragment>
        ), props.placedItems)}

        <RemovalZone
          isInDevicePlacementMode={props.isInDevicePlacementMode}
          setIsRemovingDevice={props.setIsRemovingDevice}
          movingDeviceItem={props.movingDeviceItem}
          onEndMovingDevice={props.onEndMovingDevice}
          location={props.currentLocation}
          onRemovingDevice={props.onRemovingDevice}
          onNotRemovingDevice={props.onNotRemovingDevice}
        />
      </InteractiveLayer>
    </LayerContainer>
  )
}

export default Layer;
