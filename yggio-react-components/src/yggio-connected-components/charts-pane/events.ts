﻿/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import queryString from 'query-string';

import {Device} from '../../types';

const updateUrl = (devices: string[], forceStateUpdate: () => void) => {
  const params = queryString.stringify({devices}, {arrayFormat: 'comma'});
  const newUrl = `charts?${params}`;
  window.history.replaceState({...window.history.state, as: newUrl, url: newUrl}, '', newUrl);
  // NOTE: Fix for forcing a rerender after url updates. There are probably better solutions.
  forceStateUpdate();
};

const onAddDevice = (
  addedDevices: Device[],
  deviceId: string,
  forceStateUpdate: () => void,
  setDeviceNameFilter: (name: string) => void,
) => {
  setDeviceNameFilter('');
  const addedDevicesIds = _.map(addedDevices, '_id');
  const newAddedDevicesIds = [...addedDevicesIds, deviceId];
  updateUrl(newAddedDevicesIds, forceStateUpdate);
};

const onRemoveDevice = (
  addedDevices: Device[],
  deviceId: string,
  clearFields: () => void,
  forceStateUpdate: () => void,
) => {
  const addedDevicesIds = _.map(addedDevices, '_id');
  const newAddedDevicesIds = _.reject(addedDevicesIds, _id => _id === deviceId);
  if (newAddedDevicesIds.length === 0) {
    clearFields();
  }
  updateUrl(newAddedDevicesIds, forceStateUpdate);
};

export {
  onAddDevice,
  onRemoveDevice,
};
