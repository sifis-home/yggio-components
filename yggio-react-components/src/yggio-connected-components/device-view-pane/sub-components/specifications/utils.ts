/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {Device} from '../../../../types';

const SECTIONS = {
  general: 'General',
  lora: 'LoRa',
  nibe: 'Nibe',
  netmore: 'Netmore',
  chirpstack: 'ChirpStack',
} as const;

type Section = typeof SECTIONS[keyof typeof SECTIONS];

const getSpecifications = (device: Device) => {
  if (!device) return;

  const specs = {
    [SECTIONS.general]: {},
    [SECTIONS.lora]: {},
    [SECTIONS.nibe]: {},
    [SECTIONS.netmore]: {},
    [SECTIONS.chirpstack]: {},
  } as Record<Section, Record<string, string>>;

  // General
  if (device.connector && !_.isString(device.connector)) {
    specs[SECTIONS.general].Connector = device.connector.name;
  }
  if (device.deviceModelName) {
    specs[SECTIONS.general]['Device model name'] = device.deviceModelName;
  }

  // Lora
  if (device.devEui) {
    specs[SECTIONS.lora].DevEUI = device.devEui;
  }

  if (device.appKey) {
    specs[SECTIONS.lora].AppKey = device.appKey;
  }
  if (device.appEUI) {
    specs[SECTIONS.lora].AppEUI = device.appEUI;
  }
  if (device.gatewayEui) {
    specs[SECTIONS.lora].GatewayEUI = device.gatewayEui;
  }

  // Nibe
  if (device.serialNumber) {
    specs[SECTIONS.nibe].Serial = device.serialNumber;
  }
  if (device.systemId) {
    specs[SECTIONS.nibe]['System ID'] = device.systemId;
  }

  // Netmore
  if (device.serviceProvider) {
    specs[SECTIONS.netmore]['Service Provider'] = device.serviceProvider;
    specs[SECTIONS.netmore].Username = device.username || '-';
  }

  // ChirpStack
  // Note: Dont think this way of identifying a chirpstack device is correct anymore
  if (device.nodeType === 'lora-app-server-connector') {
    specs[SECTIONS.chirpstack].Url = device.url || '-';
    specs[SECTIONS.chirpstack]['Application ID'] = device.applicationId || '-';
    specs[SECTIONS.chirpstack].Username = device.username || '-';
    specs[SECTIONS.chirpstack]['Organization ID'] = device.organizationID || '-';
    specs[SECTIONS.chirpstack]['Network Server ID'] = device.networkServerID || '-';
    specs[SECTIONS.chirpstack]['Device Profile IDs ABP'] = device.deviceProfileIdsABP || '-';
    specs[SECTIONS.chirpstack]['Device Profile IDs OTAA'] = device.deviceProfileIdsOTAA || '-';
  }

  return _.omitBy(specs, _.isEmpty);
};

export {
  getSpecifications,
};
