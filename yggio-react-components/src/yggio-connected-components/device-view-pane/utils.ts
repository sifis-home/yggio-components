/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {
  millisecondsToHours,
  millisecondsToMinutes,
  millisecondsToSeconds,
  hoursToMilliseconds,
  minutesToMilliseconds,
} from 'date-fns';

import {
  RIGHT_TYPES,
  SPECIFIC_TAB_ITEMS,
  TAB_ITEMS,
  RULES_ACTIONS_OPTIONS,
  SPECIFIC_TAB_KEYS,
  REAL_ESTATE_CORE_TAB_ITEM,
  LORA_SERVERS,
  CHIRP_STACK_COMMANDS,
} from './constants';
import {resolveDeviceType} from '../../utils';
import {DEVICE_TYPES} from '../../constants';
import {Device, Scope, FormInputs, InputValue, Channel} from '../../types';

// TODO: This is wierd and needs a refactor
const getTabItems = (device: Device, hasRecConnector: boolean) => {
  const general = _.values(TAB_ITEMS);

  const deviceType = resolveDeviceType(device) as string;
  const types = deviceType.split(',');
  const currentType = _.pick(SPECIFIC_TAB_KEYS, types);
  const [specificType] = _.values(currentType);
  const specific = _.values(SPECIFIC_TAB_ITEMS[specificType] || []);

  const realEstateCore = hasRecConnector ? [REAL_ESTATE_CORE_TAB_ITEM] : [];

  const tabItems = _.concat(general, specific, realEstateCore);
  return tabItems;
};

const createRightsList = (rights: Scope[]) => {
  const acc: Record<string, boolean> = {};
  return _.reduce(RIGHT_TYPES, (result, type) => {
    const right = _.find(rights, right => _.eq(right, type));
    result[type] = !!right;
    return result;
  }, acc);
};

const convertMillisecondsToHoursMinutesSeconds = (milliseconds?: number) => {

  if (!milliseconds) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const hours = millisecondsToHours(milliseconds);
  const hoursInMilliseconds = hoursToMilliseconds(hours);

  const minutes = millisecondsToMinutes(milliseconds - hoursInMilliseconds);
  const minutesInMilliseconds = minutesToMilliseconds(minutes);

  const seconds = millisecondsToSeconds(milliseconds - hoursInMilliseconds - minutesInMilliseconds);

  return {
    hours,
    minutes,
    seconds,
  };
};

const canBeSynchronized = (device: Device) => {
  const hasConnector = !!device.connector;
  const isConnector = !!device.downlinkQueue;
  return hasConnector || isConnector;
};

const determineActionType = (device: Device) => {
  const deviceType = resolveDeviceType(device) as string;
  const deviceTypes = _.split(deviceType, ',');
  if (_.includes(deviceTypes, DEVICE_TYPES.lora)) {
    return 'LoraDeviceAction';
  }

  // TODO: In the future we will add Z-wave support
  // if (_.includes(deviceTypes, DEVICE_TYPES.zWave)) {
  //   return 'ZWaveDeviceAction';
  // }
};
const determineGroupName = (device: Device) => {
  const deviceType = resolveDeviceType(device) as string;
  const deviceTypes = _.split(deviceType, ',');
  if (_.includes(deviceTypes, DEVICE_TYPES.lora)) {
    return 'LoRa Enhet';
  }

  // TODO: In the future we will add Z-wave support
  // if (_.includes(deviceTypes, DEVICE_TYPES.zWave)) {
  //   return 'ZWave Enhet';
  // }
};

const determineMessageTemplate = (device: Device) => {
  const deviceType = resolveDeviceType(device) as string;
  const deviceTypes = _.split(deviceType, ',');
  if (_.includes(deviceTypes, DEVICE_TYPES.lora)) {
    return {
      confirmed: false,
      fPort: '123',
      data: '123',
      reference: '',
    };
  }

  // TODO: In the future we will add Z-wave support
  // if (_.includes(deviceTypes, DEVICE_TYPES.zWave)) {
  //   return {
  //     act: "set",
  //     cc: "bswitch",
  //     value: 0,
  //   };
  // }
};

interface CreateRuleTemplateProps {
  formInputs: FormInputs;
  userId: string;
  device: Device;
}

const createRuleTemplate = (props: CreateRuleTemplateProps) => {
  const {formInputs} = props;
  const template = {
    rule: {
      name: `${_.get(formInputs, 'rulesAction.value')}.${props.device._id}.${props.device.name}`,
      triggers: [],
      owner: props.userId,
    },
    action: {
      name: `${_.get(formInputs, 'rulesAction.value')}.${props.device._id}.${props.device.name}`,
      owner: props.userId,
      groupName: determineGroupName(props.device),
      message: determineMessageTemplate(props.device),
      actionType: determineActionType(props.device),
    },
  };
  return template;
};

const createRulesActionsOptions = (deviceRules?: Record<string, string>) => {
  const options = _.filter(RULES_ACTIONS_OPTIONS, option => {
    if (!_.includes(_.values(deviceRules), option.value)) {
      return option;
    }
  });
  return options;
};

const extractChannelCreationData = (
  deviceId: string,
  formValues: Record<string, InputValue>
): Omit<Channel, '_id'> => {
  let protocolFields: string[] = [];
  if (formValues.protocol === 'mqtt') {
    protocolFields = ['type', 'recipient'];
  }
  if (formValues.protocol === 'http') {
    protocolFields = ['url'];
  }
  if (formValues.protocol === 'azureIotHub') {
    protocolFields = ['connectionString'];
  }
  if (formValues.protocol === 'desigoCC') {
    protocolFields = ['connector', 'desigoObject'];
  }
  return {
    iotnode: deviceId,
    name: formValues.name as string,
    [formValues.protocol as string]: _.pick(formValues, protocolFields),
  };
};

const getDeviceLoraServer = (device: Device) => {
  const deviceTypesString = resolveDeviceType(device) as string;
  const deviceTypes = deviceTypesString.split(',');
  if (_.includes(deviceTypes, LORA_SERVERS.chirpStack)) {
    return LORA_SERVERS.chirpStack;
  }
  if (_.includes(deviceTypes, LORA_SERVERS.netmore)) {
    return LORA_SERVERS.netmore;
  }
  if (_.includes(deviceTypes, LORA_SERVERS.actilityThingpark)) {
    return LORA_SERVERS.actilityThingpark;
  }
};

const getGetQueueRequestData = (device: Device, server: LORA_SERVERS) => {
  if (server === LORA_SERVERS.chirpStack) {
    return {
      command: CHIRP_STACK_COMMANDS.loraAppServerGetDeviceQueue,
      integrationName: LORA_SERVERS.chirpStack,
      iotnodeId: device._id,
    };
  }
  if (server === LORA_SERVERS.netmore) {
    return {
      command: 'apiCall',
      iotnodeId: device._id,
      data: {
        callName: 'getDownlinks',
        callData: {
          devEui: device.devEui,
        },
      }
    };
  }
};

const getFlushQueueRequestData = (device: Device, server: LORA_SERVERS) => {
  if (server === LORA_SERVERS.chirpStack) {
    return {
      command: CHIRP_STACK_COMMANDS.loraAppServerFlushQueue,
      integrationName: LORA_SERVERS.chirpStack,
      iotnodeId: device._id,
    };
  }
  if (server === LORA_SERVERS.netmore) {
    return {
      command: 'apiCall',
      iotnodeId: device._id,
      data: {
        callName: 'clearDownlinks',
        callData: {
          devEui: device.devEui,
        },
      }
    };
  }
};

export {
  getTabItems,
  createRightsList,
  convertMillisecondsToHoursMinutesSeconds,
  canBeSynchronized,
  createRuleTemplate,
  createRulesActionsOptions,
  extractChannelCreationData,
  getDeviceLoraServer,
  getGetQueueRequestData,
  getFlushQueueRequestData,
};
