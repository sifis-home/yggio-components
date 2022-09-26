/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {Devices, Device, IdKeyedDevices} from '../../types';

const selectDevicesData = (data: Devices) => (
  _.reduce(data, (acc: IdKeyedDevices, curr: Device) => {
    const i = curr._id;
    acc[i] = curr;
    return acc;
  }, {})
);

export {
  selectDevicesData,
};
