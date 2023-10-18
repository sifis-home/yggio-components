/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';

import {ConnectorInputValue} from './types';
import {LORA_CONNECTOR_TYPES} from '../constants';
import {FormInputs} from '../../../types';
import {getFormValues} from '../../../utils/form-wizard';
import {
  LORA_INPUTS,
  LORA_ACTIVATION_TYPES,
  LORA_INPUTS_STRUCTURE,
  STEPS,
  DEVICE_TYPES
} from './constants';

const selectActiveLoraInputs = (loraFormInputs: FormInputs) => {
  const activeInputs = [];

  activeInputs.push(LORA_INPUTS.connector.name);

  const formValues = getFormValues(loraFormInputs);

  const connector = formValues.connector as ConnectorInputValue;
  const activationType = formValues.activationType as LORA_ACTIVATION_TYPES;

  if (!connector.deviceId) {
    return activeInputs;
  }

  if (connector.type === LORA_CONNECTOR_TYPES.None) {
    return _.concat(activeInputs, LORA_INPUTS.devEui.name);
  }

  activeInputs.push(LORA_INPUTS.activationType.name);

  if (!activationType) {
    return activeInputs;
  }

  return _.concat(
    activeInputs,
    LORA_INPUTS_STRUCTURE[connector.type][activationType]
  );
};

const selectSteps = (selectedDeviceType: DEVICE_TYPES) => {
  const steps = [STEPS.deviceType];
  if (selectedDeviceType === DEVICE_TYPES.generic) {
    steps.push(STEPS.generic);
  }
  if (selectedDeviceType === DEVICE_TYPES.lora) {
    steps.push(STEPS.lora);
  }
  if (selectedDeviceType === DEVICE_TYPES.siemensDesigoCcConnector) {
    steps.push(STEPS.siemensDesigoCcConnector);
  }
  if (selectedDeviceType === DEVICE_TYPES.chirpstackConnector) {
    steps.push(STEPS.chirpstackConnector);
  }
  if (selectedDeviceType === DEVICE_TYPES.netmoreConnector) {
    steps.push(STEPS.netmoreConnector);
  }
  if (selectedDeviceType === DEVICE_TYPES.actilityThingparkConnector) {
    steps.push(STEPS.actilityThingparkConnector);
  }
  if (selectedDeviceType === DEVICE_TYPES.thingsNetworkConnector) {
    steps.push(STEPS.thingsNetworkConnector);
  }
  if (selectedDeviceType === DEVICE_TYPES.sodaq) {
    steps.push(STEPS.sodaq);
  }
  if (selectedDeviceType === DEVICE_TYPES.bleDevice) {
    steps.push(STEPS.bleDevice);
  }
  if (selectedDeviceType === DEVICE_TYPES.weatherDevice) {
    steps.push(STEPS.weatherDevice);
  }
  if (selectedDeviceType === DEVICE_TYPES.wirelessMBus) {
    steps.push(STEPS.wirelessMBus);
  }
  if (selectedDeviceType === DEVICE_TYPES.celsiviewConnector) {
    steps.push(STEPS.celsiviewConnector);
  }
  if (selectedDeviceType === DEVICE_TYPES.box2Gateway) {
    steps.push(STEPS.box2Gateway);
  }
  if (selectedDeviceType === DEVICE_TYPES.klimatorRsiConnector) {
    steps.push(STEPS.klimatorRsiConnector);
  }
  if (selectedDeviceType === DEVICE_TYPES.deltaControlsConnector) {
    steps.push(STEPS.deltaControlsConnector);
  }
  if (selectedDeviceType === DEVICE_TYPES.loraGateway) {
    steps.push(STEPS.loraGateway);
  }
  steps.push(STEPS.deviceModelName);
  steps.push(STEPS.translator);
  steps.push(STEPS.details);
  steps.push(STEPS.result);
  return steps;
};

export {
  selectActiveLoraInputs,
  selectSteps,
};
