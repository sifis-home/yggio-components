/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {FormInputs, IdKeyedDevices} from '../../../../types';
import {getFormValues} from '../../../../utils/form-wizard';
import {LORA_PRESET_SELECTIONS} from './constants';

const validateDevices = (devices: IdKeyedDevices) => {
  const isValid = _.every(devices, 'devEui');
  return isValid;
};

const createDownlinkData = (command: string, devices: IdKeyedDevices, formInputs: FormInputs) => {
  const dataInputs = getFormValues(formInputs);

  const custom = {
    reference: dataInputs.reference,
    fPort: dataInputs.fPort,
    data: dataInputs.data,
    confirmed: dataInputs.confirmed,
  };

  const body = dataInputs.preset
    ? LORA_PRESET_SELECTIONS[dataInputs.preset as keyof typeof LORA_PRESET_SELECTIONS]
    : custom;

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
};

export {
  validateDevices,
  createDownlinkData,
};
