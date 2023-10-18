/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {createSelector} from 'reselect';
import {IdKeyedDevices, Devices} from '../../../../types';

const selectConfigurableDevices = createSelector(
  (props: {devices: Devices}) => props.devices,
  (props: {selectedDevices: string[]}) => props.selectedDevices,
  (devices: Devices, selectedDevices: string[]) => (
    _.reduce(selectedDevices, (acc: IdKeyedDevices, curr: string) => {
      const idKeyedDevices = _.keyBy(devices, '_id');
      const device = idKeyedDevices[curr];
      acc[curr] = device;
      return acc;
    }, {})
  )
);

export {
  selectConfigurableDevices,
};
