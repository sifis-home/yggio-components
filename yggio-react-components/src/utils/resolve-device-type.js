/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import fp from 'lodash/fp';
import {DEVICE_TYPES} from '../constants';

const hasTruthy = fp.any(Boolean); // Checks if any item in collection is true

const isLoRaType = device => {
  const hasDevEui = !!device?.devEui;
  const isLoRa = hasTruthy([hasDevEui]);
  return isLoRa && DEVICE_TYPES.lora;
};

const isBox2Type = device => {
  const hasTag = !!device?.tag;
  const isBox2 = hasTruthy([hasTag]);
  return isBox2 && DEVICE_TYPES.box2;
};

const isCalculatedType = device => {
  const hasCalculations = fp.compose(
    fp.includes('calculations'),
    fp.keys,
  )(device);
  const isCalculated = hasTruthy([hasCalculations]);
  return isCalculated && DEVICE_TYPES.calculated;
};

const isGenericType = device => {
  const hasSecret = !!device?.secret;
  const isGeneric = hasTruthy([hasSecret]);
  return isGeneric && DEVICE_TYPES.generic;
};

const isConnector = device => {
  const hasDownlinkQueue = !!device?.downlinkQueue;
  const isConnector = hasTruthy([hasDownlinkQueue]);
  return isConnector && DEVICE_TYPES.connector;
};

const isChirpStackDevice = device => {
  const hasChirpStackConnector = device?.connector?.downlinkQueue === 'ChirpStack';
  const isChirpStackDevice = hasTruthy([hasChirpStackConnector]);
  return isChirpStackDevice && DEVICE_TYPES.chirpStack;
};

const isNetmoreDevice = device => {
  const hasNetmoreConnector = device?.connector?.downlinkQueue === 'Netmore';
  const isNetmoreDevice = hasTruthy([hasNetmoreConnector]);
  return isNetmoreDevice && DEVICE_TYPES.netmore;
};

const isActilityThingparkDevice = device => {
  const hasActilityThingparkConnector = device?.connector?.downlinkQueue === 'ActilityThingpark';
  const isActilityThingparkDevice = hasTruthy([hasActilityThingparkConnector]);
  return isActilityThingparkDevice && DEVICE_TYPES.actilityThingpark;
};

const isBleDevice = device => {
  const hasBleConnector = device?.connector?.downlinkQueue === 'bleGateway';
  const isBleDevice = hasTruthy([hasBleConnector]);
  return isBleDevice && DEVICE_TYPES.bleDevice;
};

const isWeatherDevice = device => {
  const hasWeatherConnector = device?.connector?.downlinkQueue === 'open-weather-map';
  const isWeatherDevice = hasTruthy([hasWeatherConnector]);
  return isWeatherDevice && DEVICE_TYPES.weatherNode;
};

const isLoraGatewayDevice = device => {
  const hasGatewayEui = !!device?.gatewayEui;
  const isLoraGatewayDevice = hasTruthy([hasGatewayEui]);
  return isLoraGatewayDevice && DEVICE_TYPES.loraGateway;
};

const typeCreators = [
  isBox2Type,
  isLoRaType,
  isCalculatedType,
  isGenericType,
  isConnector,
  isChirpStackDevice,
  isNetmoreDevice,
  isActilityThingparkDevice,
  isBleDevice,
  isWeatherDevice,
  isLoraGatewayDevice,
];

// TODO: This should return a array instead of a comma separated string
const resolveDeviceType = device => {
  const invokeTypeCreator = typeCreator => typeCreator(device);
  const type = fp.compose(
    fp.toString,
    fp.compact,
    fp.map(invokeTypeCreator),
  )(typeCreators);

  return type || 'Unknown';
};

export default resolveDeviceType;
