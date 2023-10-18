/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {createSelector} from 'reselect';

import {Devices} from '../../../../types';

const selectIsSynchronizable = createSelector(
  ({devices}: {devices: Devices}) => devices,
  ({deviceIds}: {deviceIds: string[]}) => deviceIds,
  (devices, deviceIds) => {
    const validDevices = _.filter(devices, device => _.includes(deviceIds, device._id));
    const downlinkQueueDevices = _.filter(validDevices, 'downlinkQueue');
    const connectorDevices = _.filter(validDevices, 'connector');
    const merged = [...downlinkQueueDevices, ...connectorDevices];
    return !_.isEmpty(merged);
  }
);

export {
  selectIsSynchronizable,
};
