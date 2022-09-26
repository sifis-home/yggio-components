/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';

import {Forms, ConnectorInputValue} from '../types';
import {LORA_CONNECTOR_TYPES} from '../../constants';
import {DEVICE_TYPES} from '../constants';
import {selectActiveLoraInputs} from '../selectors';
import {DeviceCreateData, Locations, DeviceModelName} from '../../../../types';
import {getFormValues} from '../../../../utils/form-wizard';

const selectDeviceModelNameOptions = (deviceModelNames?: DeviceModelName[]) => {
  return _.map(deviceModelNames, deviceModelName => ({
    value: deviceModelName.value,
    label: deviceModelName.displayName,
  }));
};

const selectCreateDeviceData = (forms: Forms) => {

  const data: DeviceCreateData = {
    name: forms.details.formInputs.name.value as string,
  };

  const deviceType = forms.deviceType.formInputs.deviceType.value as DEVICE_TYPES;

  // Secret
  if (deviceType === DEVICE_TYPES.generic) {
    data.secret = forms.generic.formInputs.secret.value as string;
  }

  // Lora
  if (deviceType === DEVICE_TYPES.lora) {
    const formValues = getFormValues(forms.lora.formInputs);
    const activeLoraInputs = selectActiveLoraInputs(forms.lora.formInputs);
    const loraValues = _.pick(formValues, activeLoraInputs);
    const connector = loraValues.connector as ConnectorInputValue;
    if (connector.type === LORA_CONNECTOR_TYPES.None) {
      _.unset(loraValues, 'connector');
    } else {
      loraValues.connector = connector.deviceId;
    }
    _.assign(data, loraValues);
  }

  // Description
  if (forms.details.formInputs.description.value) {
    data.description = forms.details.formInputs.description.value as string;
  }

  // Device model name
  if (forms.details.formInputs.deviceModelName.value) {
    data.deviceModelName = forms.details.formInputs.deviceModelName.value as string;
  }

  // Contextual parameters
  if (_.size(forms.details.formInputs.contextMap.value as object)) {
    data.contextMap = forms.details.formInputs.contextMap.value as Record<string, string>;
  }

  return data;
};

const selectLocationWithInsertedDevice = (
  deviceId: string,
  locations: Locations,
  locationId: string,
  blueprintId: string,
) => {
  const newItem = {
    deviceId,
    type: 'default',
    size: 'default',
  };
  const location = _.find(locations, {_id: locationId});
  if (!location) throw Error('DevErr: location not found');
  if (location.defaultLayer._id === blueprintId) {
    location.defaultLayer.items.push(newItem);
  } else {
    location.layers = _.map(location.layers, layer => {
      if (layer._id === blueprintId) {
        layer.items.push(newItem);
      }
      return layer;
    });
  }
  return location;
};

export {
  selectDeviceModelNameOptions,
  selectCreateDeviceData,
  selectLocationWithInsertedDevice,
};
