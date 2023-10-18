/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';

import {Device} from '../../../../types';
import {resolveDeviceType} from '../../../../utils';
import {DEVICE_TYPES} from '../../../../constants';

const getFilterOptions = (device: Device) => {
  const deviceType = resolveDeviceType(device) as string;
  const deviceTypes = _.split(deviceType, ',');

  const options = [
    {value: 'all', label: 'All'},
  ];
  if (deviceTypes.includes(DEVICE_TYPES.lora)) {
    options.push({value: 'lora', label: 'LoRa'});
  }
  return options;
};

const getFilteredDeviceData = (device: Device, filter: string): Record<string, string> => {
  if (filter === 'lora') {
    const loraValues = {
      devEui: device.devEui as string || device.devEui!,
      appKey: device.appKey as string || device.appKey!,
      rssi: device.rssi as string,
      frameCount: device.frameCount as string,
      fPort: device.fPort as string,
      dataRate: device.dataRate as string,
      spreadingFactor: device.spreadingFactor as string,
    };
    return _.pickBy(loraValues, v => v !== undefined);
  }
  return device as unknown as Record<string, string>;
};

export {
  getFilterOptions,
  getFilteredDeviceData,
};
