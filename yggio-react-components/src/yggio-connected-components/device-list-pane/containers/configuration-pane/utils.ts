import _ from 'lodash';
import {FormInputs, IdKeyedDevices} from '../../../../types';
import {getFormValues} from '../../../../utils/form-wizard';
import {LORA_PRESET_SELECTIONS, CHIRP_STACK_COMMANDS, LORA_TYPES} from './constants';

const validateDevices = (devices: IdKeyedDevices) => {
  const isValid = _.every(devices, 'devEui');
  return isValid;
};

interface DownlinkData {
  type?: 'Netmore' | 'ActilityThingpark' | 'ChirpStack';
  devices: IdKeyedDevices,
  formInputs: FormInputs,
}

const createDownlinkData = ({
  type,
  devices,
  formInputs,
}: DownlinkData) => {
  const dataInputs = getFormValues(formInputs);
  const custom = {
    reference: dataInputs.reference,
    fPort: dataInputs.fPort,
    data: dataInputs.data,
    confirmed: dataInputs.confirmed === 'true',
    flush: dataInputs.flush === 'true',
  };

  const body = dataInputs.preset
    ? LORA_PRESET_SELECTIONS[dataInputs.preset as keyof typeof LORA_PRESET_SELECTIONS]
    : custom;

  if (type === LORA_TYPES.ChirpStack) {
    const command = CHIRP_STACK_COMMANDS.loraAppServerQueueDownlink;
    const data = _.map(devices, device => {
      return {
        command,
        devEui: device.devEui,
        integrationName: 'ChirpStack',
        integrationCommand: 'loraAppServerQueueDownlink',
        iotnodeId: device._id,
        data: body,
      };
    });
    return data;
  }

  if (type === LORA_TYPES.Netmore) {
    const command = 'apiCall';
    const data = _.map(devices, device => {
      return {
        command,
        integrationName: 'Netmore',
        integrationCommand: command,
        iotnodeId: device._id,
        data: {
          callName: 'sendDownlink',
          callData: {
            devEui: device.devEui,
            payload: {
              fPort: body.fPort,
              payloadHex: body.data,
            },
          },
        }
      };
    });
    return data;
  }

  if (type === LORA_TYPES.ActilityThingpark) {
    const command = 'apiCall';
    const data = _.map(devices, device => {
      return {
        command,
        integrationName: 'ActilityThingpark',
        integrationCommand: command,
        iotnodeId: device._id,
        data: {
          callName: 'downlinkMessages',
          callData: {
            devEUI: device.devEui,
            iotnodeId: device._id,
            payload: {
              targetPorts: body.fPort,
              payloadHex: body.data,
            },
            qs: {
              confirmDownlink: custom.confirmed,
              flushDownlinkQueue: custom.flush,
            },
          },
        }
      };
    });
    return data;
  }
};

export {
  validateDevices,
  createDownlinkData,
};
