/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';

import {LORA_CONNECTOR_TYPES} from '../../constants';
import {Device} from '../../../../types';

const selectLoraConnectors = (devices: Device[]) => {

  const loraConnectors = _.filter(devices, device => {
    if (!device.downlinkQueue) return false;
    return device.downlinkQueue in LORA_CONNECTOR_TYPES;
  });
  return loraConnectors;
};

export {
  selectLoraConnectors,
};
