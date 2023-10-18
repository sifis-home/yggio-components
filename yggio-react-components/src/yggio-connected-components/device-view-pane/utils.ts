import _ from 'lodash';
import {
  millisecondsToHours,
  millisecondsToMinutes,
  millisecondsToSeconds,
  hoursToMilliseconds,
  minutesToMilliseconds,
} from 'date-fns';
import {channelTypes} from 'yggio-types';

import {
  SPECIFIC_TAB_ITEMS,
  TAB_ITEMS,
  RULES_ACTIONS_OPTIONS,
  SPECIFIC_TAB_KEYS,
  REAL_ESTATE_CORE_TAB_ITEM,
  LORA_SERVERS,
  CHIRP_STACK_COMMANDS,
} from './constants';
import {resolveDeviceType, parseDeltaControlsSettings} from '../../utils';
import {DEVICE_TYPES} from '../../constants';
import {Device, FormInputs, InputValue} from '../../types';

// TODO: This is wierd and needs a refactor
const getTabItems = (hasRecConnector: boolean, device?: Device) => {
  if (!device) return;

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

const checkDeviceIsSynchronizable = (device: Device) => {
  const hasConnector = !!device.connector;
  const isConnector = !!device.downlinkQueue;
  return hasConnector || isConnector;
};

const checkDeviceSupportsImport = (device: Device) => {
  const {downlinkQueue} = device;
  return downlinkQueue === 'Netmore' || downlinkQueue === 'ActilityThingpark';
};

const determineActionType = (device: Device) => {
  const deviceType = resolveDeviceType(device) as string;
  const deviceTypes = _.split(deviceType, ',');
  if (_.includes(deviceTypes, DEVICE_TYPES.lora)) {
    return 'LoraDeviceAction';
  }
};
const determineGroupName = (device: Device) => {
  const deviceType = resolveDeviceType(device) as string;
  const deviceTypes = _.split(deviceType, ',');
  if (_.includes(deviceTypes, DEVICE_TYPES.lora)) {
    return 'LoRa Enhet';
  }
};

const determineMessageTemplate = (device: Device) => {
  const deviceType = resolveDeviceType(device) as string;
  const deviceTypes = _.split(deviceType, ',');
  if (_.includes(deviceTypes, DEVICE_TYPES.lora)) {
    // Are we really using fake data???
    return {
      confirmed: false,
      fPort: '123',
      data: '123',
      reference: '',
    };
  }
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
    return !_.includes(_.values(deviceRules), option.value);
  });
  return options;
};

const extractChannelCreationData = (
  deviceId: string,
  formValues: Record<string, InputValue>
) => {
  const data: Omit<channelTypes.Channel, '_id' | 'readableFormat'> = {
    iotnode: deviceId,
    name: formValues.name as string,
  };
  if (formValues.protocol === 'mqtt') {
    data.mqtt = {
      type: formValues.type as string,
      recipient: formValues.recipient as string,
    };
  }
  if (formValues.protocol === 'http') {
    data.http = {
      url: formValues.url as string,
    };
  }
  if (formValues.protocol === 'azureIotHub') {
    data.azureIotHub = {
      connectionString: formValues.connectionString as string,
    };
  }
  if (formValues.protocol === 'desigoCC') {
    data.desigoCC = {
      connector: formValues.connector as string,
      desigoObject: formValues.desigoObject as string,
    };
  }
  if (formValues.protocol === 'deltaControls') {
    data.deltaControls = {
      connectorId: formValues.connector as string,
      mappings: parseDeltaControlsSettings(formValues.deltaControlsSettings),
    };
  }
  return data;
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
  convertMillisecondsToHoursMinutesSeconds,
  checkDeviceIsSynchronizable,
  checkDeviceSupportsImport,
  createRuleTemplate,
  createRulesActionsOptions,
  extractChannelCreationData,
  getDeviceLoraServer,
  getGetQueueRequestData,
  getFlushQueueRequestData,
};
