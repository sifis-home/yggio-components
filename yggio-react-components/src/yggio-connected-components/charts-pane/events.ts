/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import queryString from 'query-string';

import {AddedDevice} from './types';

const updateUrl = (devices: string[], forceStateUpdate: () => void) => {
  const params = queryString.stringify({devices}, {arrayFormat: 'comma'});
  const newUrl = `charts?${params}`;
  window.history.replaceState({...window.history.state, as: newUrl, url: newUrl}, '', newUrl);
  // NOTE: Fix for forcing a rerender after url updates. There are probably better solutions.
  forceStateUpdate();
};

const onAddDevice = (
  addedDevices: AddedDevice[],
  deviceId: string,
  forceStateUpdate: () => void,
) => {
  const addedDevicesIds = _.map(addedDevices, 'id');
  const newAddedDevicesIds = [...addedDevicesIds, deviceId];
  updateUrl(newAddedDevicesIds, forceStateUpdate);
};

const onRemoveDevice = (
  addedDevices: AddedDevice[],
  deviceId: string,
  clearFields: () => void,
  forceStateUpdate: () => void,
) => {
  const addedDevicesIds = _.map(addedDevices, 'id');
  const newAddedDevicesIds = _.reject(addedDevicesIds, id => id === deviceId);
  if (newAddedDevicesIds.length === 0) {
    clearFields();
  }
  updateUrl(newAddedDevicesIds, forceStateUpdate);
};

export {
  onAddDevice,
  onRemoveDevice,
};
