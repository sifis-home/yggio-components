import _ from 'lodash';
import {createSelector} from 'reselect';
import {Devices} from '../../../../types';
import {LORA_CONNECTOR_TYPES} from '../../constants';
import {ConnectorOption} from './types';

const selectConnectorOptions = (connectorDevices?: Devices): ConnectorOption[] => {
  const deviceConnectorOptions = _.map(connectorDevices, device => ({
    label: `${device.name} (${device.downlinkQueue})`,
    value: device._id,
    type: device.downlinkQueue as LORA_CONNECTOR_TYPES,
  }));
  const noConnectorOption = {
    label: LORA_CONNECTOR_TYPES.None,
    value: LORA_CONNECTOR_TYPES.None,
    type: LORA_CONNECTOR_TYPES.None,
  };
  return _.concat(deviceConnectorOptions, [noConnectorOption]);
};

const selectLoraConnectors = createSelector(
  ({devices}: {devices: Devices}) => devices,
  devices => {
    return _.filter(devices, device => {
      if (!device.downlinkQueue) return false;
      if (device.downlinkQueue === LORA_CONNECTOR_TYPES.None) return false;
      return device.downlinkQueue in LORA_CONNECTOR_TYPES;
    });
  }
);

export {
  selectConnectorOptions,
  selectLoraConnectors,
};
