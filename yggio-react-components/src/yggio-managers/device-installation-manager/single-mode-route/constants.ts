/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {LORA_CONNECTOR_TYPES, LORA_ACTIVATION_TYPES} from '../constants';

enum DEVICE_TYPES {
  generic = 1,
  lora,
}

enum STEPS {
  deviceType = 1,
  translator,
  details,
  result,
  generic,
  lora,
}

const PROGRESS_BAR_TITLES = {
  [STEPS.deviceType]: 'Device type',
  [STEPS.translator]: 'Translator',
  [STEPS.details]: 'Details',
  [STEPS.result]: 'Result',
  [STEPS.generic]: 'Generic',
  [STEPS.lora]: 'LoRa info',
};

const LORA_INPUTS = {
  connector: {
    name: 'connector',
    label: 'Connector',
    info: 'Used for connecting to the appropriate LoRa-server. A connector can be created in the Yggio control panel.',
  },
  activationType: {
    name: 'activationType',
    label: 'Activation Type',
    info: 'The way the device connects to the network.',
  },
  devEui: {
    name: 'devEui',
    label: 'DevEUI',
    info: 'A unique ID for the device.',
  },
  appKey: {
    name: 'appKey',
    label: 'AppKey',
    info: 'Root key for OTAA activationType.',
  },
  devAddr: {
    name: 'devAddr',
    label: 'DevAddr',
    info: 'Identifies the device on a particular network.',
  },
  appEui: {
    name: 'appEUI',
    label: 'AppEUI/JoinEUI',
    info: 'Identifies the join server during the over the air activation.',
  },
  classType: {
    name: 'classType',
    label: 'Class type',
    info: 'Determines what LoRa class the device is.',
  },
  priceModel: {
    name: 'priceModelMessagesCountTypesCompositeCode',
    label: 'Price model',
    info: 'Determines how many messages can be sent per day.',
  },
  externalJoinServer: {
    name: 'externalJoinServer',
    label: 'Use external join server',
    info: 'Indicates to the Network Server the device should join with an external joinserver.',
  },
  nwkSKey: {
    name: 'nwkSKey',
    label: 'NwkSKey',
    info: 'Used for encryptning the packet metadata.',
  },
  appSKey: {
    name: 'appSKey',
    label: 'AppSKey',
    info: 'Used for encryptning the packet payload.',
  },
  connectivityPlan: {
    name: 'connectivityPlanId',
    label: 'Connectity plan',
    info: 'TBA',
  },
  deviceProfileId: {
    name: 'deviceProfileId',
    label: 'Device Profile',
    info: 'TBA',
  }
};

const LORA_INPUTS_STRUCTURE = {
  [LORA_CONNECTOR_TYPES.ChirpStack]: {
    [LORA_ACTIVATION_TYPES.OTAA]: [
      LORA_INPUTS.devEui.name,
      LORA_INPUTS.appKey.name,
    ],
    [LORA_ACTIVATION_TYPES.ABP]: [
      LORA_INPUTS.devEui.name,
      LORA_INPUTS.devAddr.name,
      LORA_INPUTS.nwkSKey.name,
      LORA_INPUTS.appSKey.name,
    ],
  },
  [LORA_CONNECTOR_TYPES.Netmore]: {
    [LORA_ACTIVATION_TYPES.OTAA]: [
      LORA_INPUTS.devEui.name,
      LORA_INPUTS.appKey.name,
      LORA_INPUTS.appEui.name,
      LORA_INPUTS.classType.name,
      LORA_INPUTS.priceModel.name,
      LORA_INPUTS.externalJoinServer.name,
    ],
    [LORA_ACTIVATION_TYPES.ABP]: [
      LORA_INPUTS.devEui.name,
      LORA_INPUTS.devAddr.name,
      LORA_INPUTS.nwkSKey.name,
      LORA_INPUTS.appSKey.name,
      LORA_INPUTS.priceModel.name,
    ],
  },
  [LORA_CONNECTOR_TYPES.ActilityThingpark]: {
    [LORA_ACTIVATION_TYPES.OTAA]: [
      LORA_INPUTS.devEui.name,
      LORA_INPUTS.appKey.name,
      LORA_INPUTS.appEui.name,
      LORA_INPUTS.connectivityPlan.name,
      LORA_INPUTS.deviceProfileId.name,
    ],
    [LORA_ACTIVATION_TYPES.ABP]: [
      LORA_INPUTS.devEui.name,
      LORA_INPUTS.devAddr.name,
      LORA_INPUTS.nwkSKey.name,
      LORA_INPUTS.appSKey.name,
      LORA_INPUTS.connectivityPlan.name,
      LORA_INPUTS.deviceProfileId.name,
    ]
  }
};

export {
  DEVICE_TYPES,
  STEPS,
  PROGRESS_BAR_TITLES,
  LORA_INPUTS,
  LORA_INPUTS_STRUCTURE,
  LORA_ACTIVATION_TYPES,
};
