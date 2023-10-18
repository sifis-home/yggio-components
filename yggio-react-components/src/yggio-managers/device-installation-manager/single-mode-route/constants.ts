import {LORA_CONNECTOR_TYPES, LORA_ACTIVATION_TYPES} from '../constants';

enum DEVICE_TYPES {
  generic = 'generic',
  lora = 'lora',
  siemensDesigoCcConnector = 'siemensDesigoCcConnector',
  chirpstackConnector = 'chirpstackConnector',
  netmoreConnector = 'netmoreConnector',
  actilityThingparkConnector = 'actilityThingparkConnector',
  thingsNetworkConnector = 'thingsNetworkConnector',
  astroClock = 'astroClock',
  sodaq = 'sodaq',
  wirelessMBus = 'wirelessMBus',
  celsiviewConnector = 'celsiviewConnector',
  box2Gateway = 'box2Gateway',
  klimatorRsiConnector = 'klimatorRsiConnector',
  bleConnector = 'bleConnector',
  bleDevice = 'bleDevice',
  weatherDevice = 'weatherDevice',
  weatherConnector = 'weatherConnector',
  deltaControlsConnector = 'deltaControlsConnector',
  loraGateway = 'loraGateway',
}

enum STEPS {
  deviceType = 1,
  deviceModelName,
  translator,
  details,
  result,
  generic,
  lora,
  wirelessMBus,
  actilityThingparkConnector,
  chirpstackConnector,
  netmoreConnector,
  siemensDesigoCcConnector,
  thingsNetworkConnector,
  sodaq,
  celsiviewConnector,
  box2Gateway,
  klimatorRsiConnector,
  bleDevice,
  weatherDevice,
  deltaControlsConnector,
  loraGateway,
}

const PROGRESS_BAR_TITLES = {
  [STEPS.deviceType]: 'Device type',
  [STEPS.deviceModelName]: 'Device model name',
  [STEPS.translator]: 'Translator',
  [STEPS.details]: 'Details',
  [STEPS.result]: 'Result',
  [STEPS.generic]: 'Generic',
  [STEPS.lora]: 'LoRa info',
  [STEPS.thingsNetworkConnector]: 'The Things Network Connector info',
  [STEPS.actilityThingparkConnector]: 'Actility Thingpark Connector info',
  [STEPS.chirpstackConnector]: 'Chirpstack Connector',
  [STEPS.netmoreConnector]: 'Netmore Connector',
  [STEPS.siemensDesigoCcConnector]: 'Siemens Desigo CC Connector',
  [STEPS.sodaq]: 'Sodaq info',
  [STEPS.wirelessMBus]: 'Wireless M-bus info',
  [STEPS.celsiviewConnector]: 'Celsiview Connector info',
  [STEPS.box2Gateway]: 'Box2 Gateway connector info',
  [STEPS.klimatorRsiConnector]: 'Klimator RSI Connector info',
  [STEPS.bleDevice]: 'BLE Device info',
  [STEPS.weatherDevice]: 'Weather Device info',
  [STEPS.deltaControlsConnector]: 'Delta Controls Connector info',
  [STEPS.loraGateway]: 'LoRa Gateway info',
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
    info: '',
  },
  netmoreLorawanVersion: {
    name: 'lorawanVersionTypeCompositeCode',
    label: 'LoRaWAN version',
    info: '',
  },
  thingParkLorawanVersion: {
    name: 'thingParkLorawanVersion',
    label: 'LoRaWAN version',
    info: '',
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
      LORA_INPUTS.netmoreLorawanVersion.name,
      LORA_INPUTS.externalJoinServer.name,
    ],
    [LORA_ACTIVATION_TYPES.ABP]: [
      LORA_INPUTS.devEui.name,
      LORA_INPUTS.devAddr.name,
      LORA_INPUTS.nwkSKey.name,
      LORA_INPUTS.appSKey.name,
      LORA_INPUTS.classType.name,
      LORA_INPUTS.priceModel.name,
      LORA_INPUTS.netmoreLorawanVersion.name,
    ],
  },
  [LORA_CONNECTOR_TYPES.ActilityThingpark]: {
    [LORA_ACTIVATION_TYPES.OTAA]: [
      LORA_INPUTS.devEui.name,
      LORA_INPUTS.appKey.name,
      LORA_INPUTS.appEui.name,
      LORA_INPUTS.connectivityPlan.name,
      LORA_INPUTS.classType.name,
      LORA_INPUTS.thingParkLorawanVersion.name,
    ],
    [LORA_ACTIVATION_TYPES.ABP]: [
      LORA_INPUTS.devEui.name,
      LORA_INPUTS.devAddr.name,
      LORA_INPUTS.nwkSKey.name,
      LORA_INPUTS.appSKey.name,
      LORA_INPUTS.connectivityPlan.name,
      LORA_INPUTS.classType.name,
      LORA_INPUTS.thingParkLorawanVersion.name,
    ]
  }
};

const THINGPARK_LORAWAN_VERSIONS = {
  '1.0.2': '1.0.2',
  '1.0.3': '1.0.3',
  '1.0.4': '1.0.4',
} as const;

const THINGPARK_DEVICE_PROFILES = {
  [THINGPARK_LORAWAN_VERSIONS['1.0.2']]: {
    A: 'LORA/GenericA.1.0.2a_ETSI_Rx2-SF12',
    C: 'LORA/GenericC.1.0.2a_ETSI_Rx2-SF12',
  },
  [THINGPARK_LORAWAN_VERSIONS['1.0.3']]: {
    A: 'LORA/GenericA.1.0.3a_ETSI',
    C: 'LORA/GenericC.1.0.3a_ETSI',
  },
  [THINGPARK_LORAWAN_VERSIONS['1.0.4']]: {
    A: 'LORA/GenericA.1.0.4a_ETSI',
    C: 'LORA/GenericC.1.0.4a_ETSI',
  },
} as const;

export {
  DEVICE_TYPES,
  STEPS,
  PROGRESS_BAR_TITLES,
  LORA_INPUTS,
  LORA_INPUTS_STRUCTURE,
  LORA_ACTIVATION_TYPES,
  THINGPARK_LORAWAN_VERSIONS,
  THINGPARK_DEVICE_PROFILES,
};
