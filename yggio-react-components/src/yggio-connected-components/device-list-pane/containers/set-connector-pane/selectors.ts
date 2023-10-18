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

const selectDeviceOptions = createSelector(
  (props: {devices: Devices}) => props.devices,
  (devices: Devices) => _.map(devices, device => ({
    value: device._id,
    label: device.name || 'no-name',
  }))
);

export {
  selectDeviceOptions,
};
