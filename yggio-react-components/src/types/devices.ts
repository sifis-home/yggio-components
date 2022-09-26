/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
interface FetchDevicesProps {
  lastItemOnPage?: string;
  limit?: number;
  offset?: number;
  orderBy?: string;
  filter?: object;
}

interface Device {
  _id: string;
  mongoId?: string;
  id?: string; // will probably be removed
  name?: string;
  description?: string;
  owner?: string[];
  rabbitRouting?: {
    value: string[];
  };
  synchronizedAt?: string;
  deviceModelName?: string;
  expectedReportInterval?: number;
  connector?: {
    _id: string;
    name: string;
    downlinkQueue: string;
  };
  devEui?: string;
  lat?: number;
  lng?: number;
  latlng?: number[];
  value?: Record<string, unknown>;
  downlinkQueue?: string;
  secret?: string;
  contextMap?: Record<string, string>;
  mac?: string;
  imei?: string;
  joinAccept?: string;
  reportedAt?: string;
  tag?: string;
  gatewayEui?: string;
  vid?: string;
  pid?: string;
  rssi?: string;
  snr?: string;
  resourceName?: string;
  acknowledged?: boolean;
  appKey?: string;
  appEUI?: string;
  serialNumber?: string;
  systemId?: string;
  serviceProvider?: string;
  username?: string;
  nodeType?: string;
  url?: string;
  applicationId?: string;
  organizationId?: string;
  networkServerID?: string;
  deviceProfileIdsABP?: string;
  deviceProfileIdsOTAA?: string;
}

type DeviceCreateData = Pick<Device,
'name' | 'description' | 'deviceModelName' | 'secret' |
'expectedReportInterval' | 'connector' | 'devEui' | 'contextMap'
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

export {
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
};
