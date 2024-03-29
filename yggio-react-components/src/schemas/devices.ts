﻿/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import z from 'zod';

const translatorPreferenceUpgradePolicySchema = z.enum(['all', 'minor', 'patch', 'none']);

const translatorPreferenceSchema = z.object({
  name: z.string(),
  userId: z.string(),
  version: z.string(),
  upgradePolicy: translatorPreferenceUpgradePolicySchema,
});

const deviceSchema = z.object({
  _id: z.string(),
  mongoId: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  owner: z.array(z.string()).optional(),
  rabbitRouting: z.object({
    value: z.array(z.string()),
  }).optional(),
  synchronizedAt: z.string().optional(),
  deviceModelName: z.string().optional(),
  expectedReportInterval: z.number().optional(),
  connector: z.object({
    _id: z.string(),
    name: z.string(),
    downlinkQueue: z.string(),
  }).or(z.string()).optional(),
  translatorPreferences: z.array(translatorPreferenceSchema).optional(),
  devEui: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  latlng: z.array(z.number()).optional(),
  value: z.record(z.unknown()).optional(),
  downlinkQueue: z.string().optional(),
  secret: z.string().optional(),
  contextMap: z.record(z.union([z.string(), z.number(), z.record(z.string())])).optional(),
  mac: z.string().optional(),
  imei: z.string().optional(),
  joinAccept: z.string().optional(),
  reportedAt: z.string().optional(),
  tag: z.string().optional(),
  gatewayEui: z.string().optional(),
  vid: z.string().optional(),
  pid: z.string().optional(),
  rssi: z.string().optional(),
  snr: z.number().optional(),
  resourceName: z.string().optional(),
  acknowledged: z.boolean().optional(),
  appKey: z.string().optional(),
  appEUI: z.string().optional(),
  serialNumber: z.string().optional(),
  systemId: z.string().optional(),
  serviceProvider: z.string().optional(),
  username: z.string().optional(),
  nodeType: z.string().optional(),
  url: z.string().optional(),
  applicationId: z.string().optional(),
  networkServerID: z.string().optional(),
  deviceProfileIdsABP: z.string().optional(),
  deviceProfileIdsOTAA: z.string().optional(),
  password: z.string().optional(),
  organizationID: z.string().optional(),
  customerCode: z.string().optional(),
  subscriber: z.object({
    thingparkURL: z.string(),
    targetProfileIdentifier: z.string(),
    password: z.string(),
    username: z.string(),
    clientKey: z.string().optional(),
  }).optional(),
  apiKey: z.string().optional(),
  host: z.string().optional(),
  manufacturer: z.string().optional(),
  wMbusDeviceId: z.string().optional(),
  encryptionKey: z.string().optional(),
  clientKey: z.string().optional(),
  apiToken: z.string().optional(),
  countryCode: z.string().optional(),
  districtId: z.string().optional(),
  macAddress: z.string().optional(),
  frameCount: z.string().optional(),
  fPort: z.string().optional(),
  dataRate: z.string().optional(),
  spreadingFactor: z.string().optional(),
  apiURL: z.string().optional(),
  siteName: z.string().optional(),
  apiVersion: z.string().optional(),
});

export {
  deviceSchema,
  translatorPreferenceSchema,
  translatorPreferenceUpgradePolicySchema,
};
