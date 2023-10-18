/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {createSelector} from 'reselect';
import {channelTypes} from 'yggio-types';

import {getFormValues} from '../../utils/form-wizard';
import {LORA_SERVERS} from './constants';
import {generateUUID} from '../../utils';
import {RULES_ACTIONS, CALCULATION_NAMES} from '../../constants';
import {
  CalculatedValues,
  ChirpstackQueueResponse,
  NetmoreQueueResponse,
  GetQueueResponse,
  QueueItem,
} from './types';
import {
  Device,
  IdKeyedCalculations,
  IdKeyedRules,
  FormInputs,
  Calculation
} from '../../types';

const selectAvailableCalculations = createSelector(
  (props: {calculations?: IdKeyedCalculations}) => props.calculations,
  (props: {device: Device}) => props.device,
  (calculations, device) => {
    if (!device) {
      return [];
    }
    const selectableCalculations = _.map(calculations, calculation => {
      if (_.get(calculation, 'destination.mongoId') === device._id) {
        return {
          value: calculation._id,
          label: CALCULATION_NAMES[calculation.name as keyof typeof CALCULATION_NAMES],
        };
      }
    });

    return _.compact(selectableCalculations);
  }
);

const selectCalculations = createSelector(
  (props: {calculations?: IdKeyedCalculations}) => props.calculations,
  (props: {device?: Device}) => props.device,
  (calculations, device) => {
    if (!device) {
      return [];
    }
    return _.filter(calculations, cal => cal.destination.mongoId === device._id);
  }
);

const selectCalculatedValues = createSelector(
  (props: {device: Device}) => props.device,
  (props: {calculations?: IdKeyedCalculations}) => props.calculations,
  (props: {formInputs: FormInputs}) => props.formInputs,
  (currentDevice, calculations, formInputs) => {
    if (!calculations || _.isEmpty(calculations)) {
      return undefined;
    }
    const selectedCalculation = formInputs.selectedCalculation.value;
    const currentCalculation = calculations[selectedCalculation as string];
    const destinationPath = currentCalculation?.destination.path;
    const keys = _.split(destinationPath, '.');
    const calculationKey = _.join(keys);

    const value = _.get(currentDevice, destinationPath) as string;
    if (calculationKey && !_.isUndefined(value)) {
      const idKeyedValues = generateUUID(
        {[calculationKey]: value},
        {nested: true}
      ) as CalculatedValues;
      return idKeyedValues;
    }

  }
);

const selectNumItems = createSelector(
  (props: {device?: Device}) => props.device,
  (props: {calculations: Calculation[]}) => props.calculations,
  (props: {channels?: channelTypes.Channel[]}) => props.channels,
  (device, calculations, channels) => {
    return {
      calculations: _.size(calculations),
      channels: _.size(channels),
      contextualParameters: _.size(device?.contextMap),
      translators: _.size(device?.translatorPreferences),
    };
  }
);

const selectRules = createSelector(
  (props: {rulesActions?: IdKeyedRules}) => props.rulesActions,
  (props: {device: Device}) => props.device,
  (rules, device) => {
    if (device) {
      const acc: Record<string, string> = {};
      const currentRules = _.reduce(rules, (result, curr) => {
        const splits = _.split(curr.name, '.');
        const [ruleName, deviceId] = splits;
        if (_.includes(_.keys(RULES_ACTIONS), ruleName) && deviceId === device._id) {
          result[curr._id] = ruleName;
        }
        return result;
      }, acc);
      return currentRules;
    }
  }
);

const selectChannelFormIsValid = createSelector(
  (props: {formInputs: FormInputs}) => props.formInputs,
  formInputs => {
    const formValues = getFormValues(formInputs);
    if (!formValues.name || !formValues.protocol) {
      return false;
    }
    if (formValues.protocol === 'mqtt' && (!formValues.type || !formValues.recipient)) {
      return false;
    }
    if (formValues.protocol === 'http' && !formValues.url) {
      return false;
    }
    if (formValues.protocol === 'azureIotHub' && !formValues.connectionString) {
      return false;
    }
    if (formValues.protocol === 'desigoCC' && (!formValues.connector || !formInputs.desigoObject.validation.isValid)) {
      return false;
    }
    if (formValues.protocol === 'deltaControls' && (!formValues.connector || !formInputs.deltaControlsSettings.validation.isValid)) {
      return false;
    }
    return true;
  }
);

const selectLoraQueueItems = createSelector(
  (props: {data?: GetQueueResponse}) => props.data,
  (props: {loraServer: LORA_SERVERS}) => props.loraServer,
  (data, loraServer): QueueItem[] => {
    if (!data) {
      return [];
    }
    if (loraServer === LORA_SERVERS.netmore) {
      return _.map(data as NetmoreQueueResponse, item => ({
        data: item.requestPayloadHex,
        fPort: item.requestFPort,
      }));
    }
    if (loraServer === LORA_SERVERS.chirpStack) {
      return _.map((data as ChirpstackQueueResponse).items, item => ({
        data: item.data,
        fPort: item.fPort,
        confirmed: item.confirmed ? 'Yes' : 'No',
        fCnt: item.fCnt,
      }));
    }
    return [];
  }
);

export {
  selectAvailableCalculations,
  selectCalculations,
  selectCalculatedValues,
  selectNumItems,
  selectRules,
  selectChannelFormIsValid,
  selectLoraQueueItems,
};
