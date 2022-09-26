/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// constants.ts

import {RELEVANT_VALUES} from '../../constants';

const TABLE_ROW_HEIGHT = 44;

/* eslint-disable camelcase */
const VALUE_TYPES = {
  temperature: 'temperature',
  temperature_value: 'temperature_value',
  averageTemperature: 'averageTemperature',
  temperatureAverage: 'temperatureAverage',
  temperatureAverage_value: 'temperatureAverage_value',
  averageTemperature_value: 'averageTemperature_value',
  humidity: 'humidity',
  humidity_value: 'humidity_value',
  snr: 'snr',
  rssi: 'rssi',
  moisture: 'moisture',
  luminance: 'luminance',
  illuminance: 'illuminance',
  door: 'door',
  presence: 'presence',
};
/* eslint-disable camelcase */

const temperature = {name: 'temp', unit: '°C'};
const averageTemperature = {name: 'avgTemp', unit: '°C'};
const door = {name: 'door'};
const humidity = {name: 'humidity', unit: '%'};
const snr = {name: 'snr', unit: 'dB'};
const rssi = {name: 'rssi'};
const moisture = {name: 'moisture', unit: '%'};
const luminance = {name: 'luminance', unit: 'lux'};
const illuminance = {name: 'illuminance', unit: 'lux'};
const presence = {name: 'presence'};

const KNOWN_VALUES = {
  [VALUE_TYPES.temperature]: temperature,
  [VALUE_TYPES.temperature_value]: temperature,
  [VALUE_TYPES.averageTemperature]: averageTemperature,
  [VALUE_TYPES.averageTemperature_value]: averageTemperature,
  [VALUE_TYPES.temperatureAverage]: averageTemperature,
  [VALUE_TYPES.temperatureAverage_value]: averageTemperature,
  [VALUE_TYPES.door]: door,
  [VALUE_TYPES.humidity]: humidity,
  [VALUE_TYPES.humidity_value]: humidity,
  [VALUE_TYPES.snr]: snr,
  [VALUE_TYPES.rssi]: rssi,
  [VALUE_TYPES.moisture]: moisture,
  [VALUE_TYPES.luminance]: luminance,
  [VALUE_TYPES.illuminance]: illuminance,
  [VALUE_TYPES.presence]: presence,
};

const DEFAULT_PAGE_SIZE = 15;

const PAGE_SIZES = [
  {label: '15', value: 15},
  {label: '25', value: 25},
  {label: '50', value: 50},
  {label: '100', value: 100},
  {label: '200', value: 200},
  {label: '500', value: 500},
  {label: '1000', value: 1000},
];

const FILTERING_TYPES = {
  name: 'name',
  deviceModelName: 'deviceModelName',
  type: 'type',
  devEui: 'devEui',
};

const FILTER_TAGS_NAMES = {
  filterName: 'name',
  filterDeviceModelName: 'device model name',
  filterType: 'type',
};

const INTEGRATION_TYPES = [
  {value: 'TheThingsNetwork', label: 'The Things Network'},
  {value: 'Netmore', label: 'Netmore'},
  {value: 'ActilityThingpark', label: 'Actility Thingpark'},
  {value: 'CTSiCPE', label: 'CTSiCPE'},
  {value: 'AstroClock', label: 'AstroClock'},
  {value: 'ChirpStack', label: 'Chirp Stack'},
];

const DEVICE_TYPES = [
  {value: 'device', label: 'Device'},
  {value: 'connector', label: 'Connector'},
];

const COLUMNS = {
  name: {
    name: 'name',
    width: 'minmax(100px, 3fr)',
    sortable: true,
  },
  type: {
    name: 'type',
    width: 'minmax(0, 2fr)',
  },
  id: {
    name: 'id',
    width: 'minmax(0, 2fr)',
  },
  status: {
    name: 'status',
    width: 'minmax(50px, 1fr)',
  },
  values: {
    name: 'values',
    width: 'minmax(0, 2fr)',
  },
  expectedReportInterval: {
    name: 'expectedReportInterval',
    width: 'minmax(0, 2fr)',
  },
  reportedAt: {
    name: 'reportedAt',
    width: 'minmax(0, 2fr)',
    align: 'right',
    sortable: true,
  },
  owned: {
    name: 'owned',
    width: 'minmax(50px, 1fr)'
  },
  actions: {
    name: 'actions',
    width: 'minmax(0, 2fr)',
  },
  [RELEVANT_VALUES.lora.devEui.name]: {
    name: RELEVANT_VALUES.lora.devEui.name,
    width: 'minmax(0, 2fr)',
  },
  [RELEVANT_VALUES.lora.rssi.name]: {
    name: RELEVANT_VALUES.lora.rssi.name,
    width: 'minmax(0, 1fr)',
    align: 'right',
  },
  [RELEVANT_VALUES.lora.frameCount.name]: {
    name: RELEVANT_VALUES.lora.frameCount.name,
    width: 'minmax(0, 1fr)',
    align: 'right',
  },
  [RELEVANT_VALUES.lora.fPort.name]: {
    name: RELEVANT_VALUES.lora.fPort.name,
    width: 'minmax(0, 1fr)',
    align: 'right',
  },
  [RELEVANT_VALUES.lora.dataRate.name]: {
    name: RELEVANT_VALUES.lora.dataRate.name,
    width: 'minmax(0, 1fr)',
    align: 'right',
  },
  [RELEVANT_VALUES.lora.spreadingFactor.name]: {
    name: RELEVANT_VALUES.lora.spreadingFactor.name,
    width: 'minmax(0, 1fr)',
    align: 'right',
  },
};

const COLUMN_PRESETS = {
  default: {
    name: 'Default',
    columns: [
      COLUMNS.name.name,
      COLUMNS.type.name,
      COLUMNS.status.name,
      COLUMNS.values.name,
      COLUMNS.reportedAt.name,
    ],
  },
  lora: {
    name: 'LoRa',
    columns: [
      COLUMNS.name.name,
      COLUMNS.devEui.name,
      COLUMNS.rssi.name,
      COLUMNS.reportedAt.name,
    ],
  },
};

const SIDEBAR_SIBLING_WIDTH = 1300;

const PAGES = {
  default: 'default',
  calculations: 'calculations',
  tools: 'tools',
  configuration: 'configuration',
  editing: 'editing',
  reportInterval: 'reportInterval',
  deletion: 'deletion',
  channels: 'channels',
};

export {
  TABLE_ROW_HEIGHT,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZES,
  FILTERING_TYPES,
  FILTER_TAGS_NAMES,
  KNOWN_VALUES,
  INTEGRATION_TYPES,
  DEVICE_TYPES,
  COLUMNS,
  COLUMN_PRESETS,
  SIDEBAR_SIBLING_WIDTH,
  PAGES,
};
