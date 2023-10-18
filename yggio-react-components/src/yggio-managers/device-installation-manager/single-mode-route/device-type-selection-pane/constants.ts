/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {DEVICE_TYPES} from '../constants';

const options = [
  {value: DEVICE_TYPES.generic, label: 'Generic'},
  {value: DEVICE_TYPES.lora, label: 'LoRaWAN'},
  {value: DEVICE_TYPES.siemensDesigoCcConnector, label: 'Siemens Desigo CC Connector'},
  {value: DEVICE_TYPES.chirpstackConnector, label: 'ChirpStack Connector'},
  {value: DEVICE_TYPES.netmoreConnector, label: 'Netmore Connector'},
  {value: DEVICE_TYPES.actilityThingparkConnector, label: 'Actility Thingpark Connector'},
  {value: DEVICE_TYPES.thingsNetworkConnector, label: 'The Things Network Connector'},
  {value: DEVICE_TYPES.astroClock, label: 'Astro Clock'},
  {value: DEVICE_TYPES.sodaq, label: 'Sodaq'},
  {value: DEVICE_TYPES.wirelessMBus, label: 'Wireless M-bus'},
  {value: DEVICE_TYPES.celsiviewConnector, label: 'Celsiview Connector'},
  {value: DEVICE_TYPES.box2Gateway, label: 'Box2 Gateway'},
  {value: DEVICE_TYPES.klimatorRsiConnector, label: 'Klimator RSI Connector'},
  {value: DEVICE_TYPES.bleConnector, label: 'BLE Connector'},
  {value: DEVICE_TYPES.bleDevice, label: 'BLE Device'},
  {value: DEVICE_TYPES.deltaControlsConnector, label: 'Delta Controls Connector'},
  {value: DEVICE_TYPES.weatherDevice, label: 'Weather Device'},
  {value: DEVICE_TYPES.weatherConnector, label: 'Weather Connector'},
  {value: DEVICE_TYPES.loraGateway, label: 'LoRa Gateway'},
];

export {options};
