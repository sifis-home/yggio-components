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
