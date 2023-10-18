interface MqttServer {
  host: string;
  protocol: string;
  port?: number;
  username?: string;
  password?: string;
  rejectUnauthorized?: boolean;
  ca?: string;
  cert?: string,
  key?: string,
  passphrase?: string,
}

interface ChirpstackConnector {
  _id: string;
  integration: 'ChirpStack';
  name: string;
  downlink?: {
    url: string;
    username: string;
    password: string;
    applicationId: string;
    networkServerID: string;
    organizationID: string;
  },
  uplink?: {
    topic: string;
    consumers?: {
      functionName: string;
      topic: string;
    }[],
    mqttServer: MqttServer,
  },
}

interface NetmoreConnector {
  _id: string;
  integration: 'Netmore';
  name: string;
  downlink?: {
    url: string;
    username: string;
    password: string;
    serviceProvider: string;
  },
  uplink?: {
    integrationType: string;
    mqttServer: MqttServer,
    consumers: {
      functionName: string;
      topic: string;
    }[]
  },
}

interface ActilityThingparkConnector {
  _id: string;
  integration: 'ActilityThingpark';
  name: string;
  downlink?: {
    url: string;
    username: string;
    password: string;
    apiVersion: string;
    oauthClient: string;
  },
  uplink: boolean;
}

interface InternalGenericMqttConnector {
  _id: string;
  integration: 'Generic';
  name: string;
  basicCredentialsSetId: string;
}

interface ExternalGenericMqttConnector {
  _id: string;
  integration: 'Generic';
  name: string;
  downlink: {
    mqttServer: {
      host: string;
      protocol: string;
    },
    topic: string;
  }
}

type GenericMqttConnector = InternalGenericMqttConnector | ExternalGenericMqttConnector;

type Connector = ChirpstackConnector | NetmoreConnector | ActilityThingparkConnector | GenericMqttConnector;

// TODO: Clean up this file!

export type {
  ChirpstackConnector,
  NetmoreConnector,
  ActilityThingparkConnector,
  Connector,
  MqttServer,
  GenericMqttConnector,
};
