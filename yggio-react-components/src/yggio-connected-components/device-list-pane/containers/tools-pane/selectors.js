/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {createSelector} from 'reselect';

const selectDeviceOptions = createSelector(
  props => props.devices,
  devices => _.map(devices, device => ({
    value: device._id,
    label: device.name,
  }))
);

export {
  selectDeviceOptions,
};
