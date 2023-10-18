/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {COLORS} from '../../constants';
import {Column} from './types';

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
  calculations: 'calculations',
};
/* eslint-enable camelcase */

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
const calculations = {name: 'calculations'};

const KNOWN_VALUES: Record<string, {name: string, unit?: string}> = {
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
  [VALUE_TYPES.calculations]: calculations,
};

const DEFAULT_PAGE_SIZE = 15;

const PAGE_SIZES = [
  {label: '15', value: 15},
  {label: '25', value: 25},
  {label: '50', value: 50},
  {label: '100', value: 100},
  {label: '200', value: 200},
  // Temporary disabled until we can handle batch features on this many nodes
  // {label: '500', value: 500},
  // {label: '1000', value: 1000},
];

const FILTERING_TYPES = {
  name: 'name',
  deviceModelName: 'deviceModelName',
  type: 'type',
  devEui: 'devEui',
  connector: 'connector',
  contextualParameter: 'contextualParameter',
  q: 'q',
} as const;

const FILTER_TAGS_NAMES = {
  filterName: 'Name',
  filterDeviceModelName: 'Device model name',
  filterType: 'Type',
  filterDevEui: 'DevEUI',
  filterConnector: 'Connector',
  filterContextualParameter: 'Contextual parameter',
  filterQ: 'Custom query',
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
  name: 'name',
  type: 'type',
  id: 'id',
  status: 'status',
  values: 'values',
  expectedReportInterval: 'expectedReportInterval',
  reportedAt: 'reportedAt',
  owned: 'owned',
  commandButtons: 'commandButtons',
  devEui: 'devEui',
  rssi: 'rssi',
  frameCount: 'frameCount',
  fPort: 'fPort',
  dataRate: 'dataRate',
  spreadingFactor: 'spreadingFactor',
  deviceModelName: 'deviceModelName',
  custom: 'custom',
} as const;

interface ColumnSetting {
  width: string;
  align?: string;
  sortable?: boolean;
}

const COLUMNS_SETTINGS: Record<Column, ColumnSetting> = {
  [COLUMNS.name]: {
    width: 'minmax(100px, 3fr)',
    sortable: true,
  },
  [COLUMNS.type]: {
    width: 'minmax(0, 2fr)',
  },
  [COLUMNS.id]: {
    width: 'minmax(0, 2fr)',
  },
  [COLUMNS.status]: {
    width: 'minmax(50px, 1fr)',
  },
  [COLUMNS.values]: {
    width: 'minmax(0, 2fr)',
  },
  [COLUMNS.expectedReportInterval]: {
    width: 'minmax(0, 2fr)',
  },
  [COLUMNS.reportedAt]: {
    width: 'minmax(0, 2fr)',
    align: 'right',
    sortable: true,
  },
  [COLUMNS.owned]: {
    width: 'minmax(50px, 1fr)'
  },
  [COLUMNS.commandButtons]: {
    width: 'minmax(0, 2fr)',
  },
  [COLUMNS.devEui]: {
    width: 'minmax(0, 2fr)',
  },
  [COLUMNS.rssi]: {
    width: 'minmax(0, 1fr)',
    align: 'right',
  },
  [COLUMNS.frameCount]: {
    width: 'minmax(0, 1fr)',
    align: 'right',
  },
  [COLUMNS.fPort]: {
    width: 'minmax(0, 1fr)',
    align: 'right',
  },
  [COLUMNS.dataRate]: {
    width: 'minmax(0, 1fr)',
    align: 'right',
  },
  [COLUMNS.spreadingFactor]: {
    width: 'minmax(0, 1fr)',
    align: 'right',
  },
  [COLUMNS.deviceModelName]: {
    width: 'minmax(100px, 2fr)',
    align: 'right',
  },
  [COLUMNS.custom]: {
    width: 'minmax(50px, 1fr)',
  },
};

const COLUMN_PRESETS: Record<'default' | 'lora', {name: string, columns: Column[]}> = {
  default: {
    name: 'Default',
    columns: [
      COLUMNS.name,
      COLUMNS.type,
      COLUMNS.status,
      COLUMNS.values,
      COLUMNS.reportedAt,
    ],
  },
  lora: {
    name: 'LoRa',
    columns: [
      COLUMNS.name,
      COLUMNS.devEui,
      COLUMNS.rssi,
      COLUMNS.reportedAt,
    ],
  },
};

const SIDEBAR_SIBLING_WIDTH = 1300;

const PAGES = {
  default: 'default',
  calculations: 'calculations',
  configuration: 'configuration',
  editing: 'editing',
  reportInterval: 'reportInterval',
  deletion: 'deletion',
  channels: 'channels',
  setConnector: 'setConnector',
  synchronize: 'synchronize',
};

const FILTER_FIELDS = [
  'filterConnector',
  'filterContextualParameterKey',
  'filterContextualParameterValue',
  'filterType',
  'filterDeviceModelName',
  'filterDevEui',
  'filterName',
  'filterQ',
] as const;

const COLOR_OPTIONS = [
  {label: 'Green', value: 'green', color: COLORS.grafanaGreen},
  {label: 'Yellow', value: 'yellow', color: COLORS.grafanaYellow},
  {label: 'Red', value: 'red', color: COLORS.grafanaRed},
  {label: 'Blue', value: 'blue', color: COLORS.grafanaBlue},
];

const COLUMN_THRESHOLDS_LABELS = {
  lt: 'Less than',
  gt: 'Greater than',
  eq: 'Equal to',
} as const;

const COLUMN_THRESHOLDS = [
  {label: COLUMN_THRESHOLDS_LABELS.lt, value: 'lt'},
  {label: COLUMN_THRESHOLDS_LABELS.gt, value: 'gt'},
  {label: COLUMN_THRESHOLDS_LABELS.eq, value: 'eq'},
];

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
  COLUMNS_SETTINGS,
  COLUMN_PRESETS,
  SIDEBAR_SIBLING_WIDTH,
  PAGES,
  FILTER_FIELDS,
  COLOR_OPTIONS,
  COLUMN_THRESHOLDS_LABELS,
  COLUMN_THRESHOLDS,
};

export type {
  Column,
};
