/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {createSelector} from 'reselect';

import {createRightsList} from './utils';
import {getFormValues} from '../../utils/form-wizard';
import {DATA_FILTER_OPTIONS, SPEC_SECTIONS, LORA_SERVERS} from './constants';
import {generateUUID, resolveDeviceType} from '../../utils';
import {RULES_ACTIONS, CALCULATION_NAMES, DEVICE_TYPES} from '../../constants';
import {
  DataFilter,
  CalculatedValues,
  ChirpstackQueueResponse,
  NetmoreQueueResponse,
  GetQueueResponse,
  QueueItem,
} from './types';
import {
  Device,
  IdKeyedCalculations,
  AccessRights,
  Users,
  Channel,
  IdKeyedRules,
  FormInputs,
  Translate,
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
          // @ts-ignore - unsure how to type
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          label: CALCULATION_NAMES[calculation.name],
        };
      }
    });

    return _.compact(selectableCalculations);
  }
);

const selectSpecifications = createSelector(
  (props: {device: Device}) => props.device,
  (props: {t: Translate}) => props.t,
  (device, t) => {

    if (!device) return;
    const specs = {};

    if (device.connector) {
      _.set(specs, [_.capitalize(t('titles.general')), 'Connector'], device.connector.name);
    }

    if (device.devEui) {
      _.set(specs, [SPEC_SECTIONS.lora, 'Device model name'], device.deviceModelName);
      _.set(specs, [SPEC_SECTIONS.lora, 'Dev Eui'], device.devEui);
      _.set(specs, [SPEC_SECTIONS.lora, 'App key'], device.appKey);
      _.set(specs, [SPEC_SECTIONS.lora, 'App Eui'], device.appEUI);
    }

    if (device.gatewayEui) {
      _.set(specs, [SPEC_SECTIONS.lora, 'Gateway Eui'], device.gatewayEui);
    }

    if (device.serialNumber) {
      _.set(specs, [SPEC_SECTIONS.nibe, 'Serial'], device.serialNumber);
    }

    if (device.systemId) {
      _.set(specs, [SPEC_SECTIONS.nibe, 'System ID'], device.systemId);
    }

    if (device.serviceProvider) {
      _.set(specs, [SPEC_SECTIONS.netmore, 'Service Provider'], device.serviceProvider);
      _.set(specs, [SPEC_SECTIONS.netmore, 'Username'], device.username);
    }

    if (device.nodeType === 'lora-app-server-connector') {
      _.set(specs, [SPEC_SECTIONS.chirpstack, 'Url'], device.url);
      _.set(specs, [SPEC_SECTIONS.chirpstack, 'Application ID'], device.applicationId);
      _.set(specs, [SPEC_SECTIONS.chirpstack, 'Username'], device.username);
      _.set(specs, [SPEC_SECTIONS.chirpstack, 'Organization ID'], device.organizationId);
      _.set(specs, [SPEC_SECTIONS.chirpstack, 'Network Server ID'], device.networkServerID);
      _.set(specs, [SPEC_SECTIONS.chirpstack, 'Device Profile IDs ABP'], device.deviceProfileIdsABP);
      _.set(specs, [SPEC_SECTIONS.chirpstack, 'Device Profile IDs OTAA'], device.deviceProfileIdsOTAA);
    }

    return specs;
  }
);

const selectDataFilterOptions = createSelector(
  (props: {device: Device}) => props.device,
  device => {
    if (!device) return [];
    const items = [DATA_FILTER_OPTIONS.values.value, DATA_FILTER_OPTIONS.all.value];

    const deviceType = resolveDeviceType(device) as string;
    const deviceTypes = _.split(deviceType, ',');

    if (_.includes(deviceTypes, DEVICE_TYPES.lora)) {
      items.push(DATA_FILTER_OPTIONS.lora.value);
    }

    if (_.includes(deviceTypes, DEVICE_TYPES.box2)) {
      items.push(DATA_FILTER_OPTIONS.box2.value);
    }

    return _.values(_.pick(DATA_FILTER_OPTIONS, items));
  }
);

const selectAccessRights = createSelector(
  (props: {userId: string | null}) => props.userId,
  (props: {accessRights?: AccessRights}) => props.accessRights,
  (userId, accessRights) => {
    if (!accessRights) {
      return undefined;
    }
    return _.find(accessRights, right => _.eq(right?.userId, userId));
  }
);

const selectAccessRightsUsers = createSelector(
  (props: {userId: string | null}) => props.userId,
  (props: {accessRights?: AccessRights}) => props.accessRights,
  (props: {users?: Users}) => props.users,
  (props: {device: Device}) => props.device,
  (userId, accessRights, users, device) => {
    if (!accessRights) {
      return [];
    }
    const acl = _.map(accessRights, right => {
      if (!_.eq(userId, right?.userId)) {
        const user = _.find(users, user => user._id === right.userId);
        if (!_.includes(device?.owner, user?.username) && user) {
          return {
            ...right,
            name: user?.username || 'unknown',
            scope: createRightsList(right?.scope),
          };
        }
      }
    });
    return _.compact(acl);
  }
);

const selectAccessRightsUserIds = createSelector(
  (props: {userId: string | null}) => props.userId,
  (props: {accessRights?: AccessRights}) => props.accessRights,
  (userId, accessRights) => {
    if (!accessRights) {
      return [];
    }
    const acl = _.map(accessRights, right => {
      if (!_.eq(userId, right?.userId)) {
        return right?.userId;
      }
    });
    return _.compact(acl);
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
    const currentCalculation = calculations[(selectedCalculation as string)];
    const destinationPath = currentCalculation.destination.path;
    const [, ...keys] = _.split(destinationPath, '.');
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
  (props: {calculations: Calculation[]}) => props.calculations,
  (props: {channels?: Channel[]}) => props.channels,
  (props: {contextualParameters?: Record<string, string>}) => props.contextualParameters,
  (calculations, channels, contextualParameters) => {
    return {
      calculations: _.size(calculations),
      channels: _.size(channels),
      contextualParameters: _.size(contextualParameters),
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

const selectDeviceData = createSelector(
  (props: {device: Device}) => props.device,
  (props: {filter: DataFilter}) => props.filter,
  (device, filter) => {
    if (filter === DataFilter.values) {
      return device.value;
    }
    if (filter === DataFilter.lora) {
      const loraValues = {
        devEui: device.value?.devEui as string || device.devEui,
        appKey: device.value?.appKey as string || device.appKey,
        rssi: device.value?.rssi as string,
        frameCount: device.value?.frameCount as string,
        fPort: device.value?.fPort as string,
        dataRate: device.value?.dataRate as string,
        spreadingFactor: device.value?.spreadingFactor as string,
      };
      return _.pickBy(loraValues);
    }
    if (filter === DataFilter.box2) {
      return device.value?.value;
    }
    return device;
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

const selectPositionIsChanged = createSelector(
  (props: {formInputs: FormInputs}) => props.formInputs,
  (props: {currentCooridates: number[]}) => props.currentCooridates,
  (formInputs, currentCooridates) => {
    if (!formInputs.latitude.value || !formInputs.longitude.value) {
      return false;
    }
    return Number(formInputs.latitude.value) !== currentCooridates[0] ||
      Number(formInputs.longitude.value) !== currentCooridates[1];
  }
);

export {
  selectAvailableCalculations,
  selectSpecifications,
  selectAccessRights,
  selectAccessRightsUsers,
  selectAccessRightsUserIds,
  selectCalculations,
  selectCalculatedValues,
  selectNumItems,
  selectRules,
  selectDataFilterOptions,
  selectDeviceData,
  selectChannelFormIsValid,
  selectLoraQueueItems,
  selectPositionIsChanged,
};
