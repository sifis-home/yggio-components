/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {RemovalZoneContainer} from '../styled';

const RemovalZone = (
  {
    isInDevicePlacementMode,
    onRemovingDevice,
    movingDeviceItem,
    onEndMovingDevice,
    onNotRemovingDevice,
  }
) => isInDevicePlacementMode && (
  <RemovalZoneContainer
    onMouseOver={onRemovingDevice}
    handleMouseOut={onNotRemovingDevice}
    movingDeviceItem={movingDeviceItem}
    onMouseUp={onEndMovingDevice}
  >
    Drag and drop device here to remove it from layer
  </RemovalZoneContainer>
)

export default RemovalZone;
