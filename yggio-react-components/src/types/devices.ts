/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import z from 'zod';

import {deviceSchema, translatorPreferenceUpgradePolicySchema, translatorPreferenceSchema} from '../schemas';


interface FetchDevicesProps {
  lastItemOnPage?: string;
  limit?: number;
  offset?: number;
  orderBy?: string;
  filter?: object;
}

type TranslatorPreferenceUpgradePolicy = z.infer<typeof translatorPreferenceUpgradePolicySchema>;
type TranslatorPreference = z.infer<typeof translatorPreferenceSchema>;
type Device = z.infer<typeof deviceSchema>;

type DeviceCreateData = Pick<Device,
'name' | 'description' | 'deviceModelName' | 'secret' |
'expectedReportInterval' | 'connector' | 'devEui' | 'contextMap' |
'apiKey' | 'host' | 'applicationId' | 'downlinkQueue' | 'username' |
'url' | 'password' | 'networkServerID' | 'deviceProfileIdsABP' |
'deviceProfileIdsOTAA' | 'organizationID' | 'serviceProvider' |
'customerCode' | 'subscriber' | 'imei' |
'manufacturer' | 'wMbusDeviceId' | 'encryptionKey' |
'appKey' | 'clientKey' |
'apiToken' | 'countryCode' | 'districtId' | 'translatorPreferences' | 'macAddress' |
'apiURL'| 'siteName' | 'apiVersion' | 'gatewayEui'
>;

interface DeviceIdProps {
  deviceId: string;
}

type Devices = Device[];
type IdKeyedDevices = Record<string, Device>;

// TODO MICKE: createRecDeviceMutation made this one wierd
interface DeviceCommand {
  command: string;
  integrationName?: string;
  integrationCommand?: string;
  iotnodeId?: string;
  data?: object;
}

interface NetmorePriceModel {
  compositeCode: string;
  code: string;
  name: string;
  filtered: boolean;
  domain: unknown;
}

interface ActilityThingParkConnectivityPlan {
  id: string;
  name: string;
  // NOTE: Untested. May have more attributes.
}

type DeviceCommands = DeviceCommand[];

export type {
  FetchDevicesProps,
  Device,
  DeviceCreateData,
  Devices,
  DeviceIdProps,
  IdKeyedDevices,
  DeviceCommand,
  NetmorePriceModel,
  ActilityThingParkConnectivityPlan,
  DeviceCommands,
  TranslatorPreferenceUpgradePolicy,
  TranslatorPreference,
};
