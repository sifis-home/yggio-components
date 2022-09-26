/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';

import COLORS from './colors';
import CONNECTIVITY_STATES from './connectivity-states';
import TOAST_TYPES from './toast-types';
import STATE from './state';
import RESOURCE_SCOPES from './resource-scopes';
import RESOURCE_TYPES from './resource-types';
import KEY_CODES from './key-codes';
import REQUEST_METHODS from './request-methods';
import ERRORS from './errors';
import SEPARATORS from './separators';
import {
  MAP,
  GEO_ERROR_CODES
} from './map';
import MEASUREMENTS from './measurements';
import LOCATION from './location';
import IMAGE_NAME_SPACES from './image-name-spaces';
import IMAGES from './images';
import DEVICE_MEASUREMENTS from './device-measurements';
import SOCKET from './socket';
import STATUS_TYPES from './status-types';
import DEVICE_TYPES from './device-types';
import HTTP_METHODS from './http-methods';
import getExternalUrls from './external-app-urls';

import {
  ENV_TYPES,
  ENV_KEYS,
} from './env-constants';

import {
  LEAFLET_URL,
  LEAFLET_ATTRIBUTION,
  COOKIE_TOKEN_KEY,
  COOKIE_OAUTH_STATE_KEY,
} from './web-constants';

import {
  YGGIO_APPS,
  YGGIO_APP_KEY,
  LOCAL_APP_DOMAIN,
  DEFAULT_APP_URLS,
  LOCAL_APP_PORTS,
  ROUTE_TRIMMED_CHARS,
  INTER_HISTORY_TYPES,
} from './routing-constants';

import {
  GLOBAL_ACCESS_USER_GROUP_REF,
  GLOBAL_ACCESS_RESOURCE_GROUP_REF,
  PUBLIC_ACCESS_RESOURCE_GROUP_REF,
  ACCESS_USER_GROUP_TYPES,
  ACCESS_RESOURCE_GROUP_TYPES,
  ACCESS_SCOPES,
  ACCESS_RESOURCE_TYPES,
  ACCESS_ORG_UNIT_SCOPES, // needs changes
  ACCESS_ORG_UNIT_RESOURCE_TYPES,
} from './access-constants';

const RULES_ACTIONS = {
  turnOn: 'On',
  turnOff: 'Off',
};

const RELEVANT_VALUES = {
  lora: {
    devEui: {
      name: 'devEui',
      getValue: device => _.get(device, 'value.devEui') || _.get(device, 'devEui'),
    },
    rssi: {
      name: 'rssi',
      getValue: device => _.get(device, 'value.rssi'),
    },
    frameCount: {
      name: 'frameCount',
      getValue: device => _.get(device, 'value.frameCount'),
    },
    fPort: {
      name: 'fPort',
      getValue: device => _.get(device, 'value.fPort'),
    },
    dataRate: {
      name: 'dataRate',
      getValue: device => _.get(device, 'value.dataRate'),
    },
    spreadingFactor: {
      name: 'spreadingFactor',
      getValue: device => _.get(device, 'value.spreadingFactor'),
    },
  },
};

const CALCULATIONS_TYPES = {
  sumLastValues: 'sumLastValues',
  averageLastValues: 'averageLastValues',
  maxLastValues: 'maxLastValues',
  minLastValues: 'minLastValues',
  averageEachNode: 'averageEachNode',
  sumEachNode: 'sumEachNode',
  totalMonthlySum: 'totalMonthlySum',
  aggregatedValueOverTime: 'aggregatedValueOverTime',
  averageAggregatedValueOverTime: 'averageAggregatedValueOverTime',
  monthlySumPerEachNode: 'monthlySumPerEachNode',
  monthlyDiffFromTotalEachNode: 'monthlyDiffFromTotalEachNode',
  monthlyDiffFromTotal: 'monthlyDiffFromTotal',
};

const CALCULATION_NAMES = {
  a: 'Sum of last values',
  b: 'Average of last values',
  c: 'Maximum of last values',
  d: 'Minimum of last values',
  e: 'Average of each node',
  f: 'Sum of each node',
  g: 'Aggregated value over time',
  h: 'Average of sum',
  i: 'Monthly sum per each node',
  j: 'Total monthly sum',
  k: 'Monthly difference from total on each node',
  l: 'Monthly difference from total grouped',
};

export {
  RELEVANT_VALUES,
  CALCULATIONS_TYPES,
  CALCULATION_NAMES,
  COLORS,
  CONNECTIVITY_STATES,
  TOAST_TYPES,
  STATE,
  RESOURCE_SCOPES,
  RESOURCE_TYPES,
  KEY_CODES,
  REQUEST_METHODS,
  ERRORS,
  SEPARATORS,
  MAP,
  GEO_ERROR_CODES,
  MEASUREMENTS,
  LOCATION,
  IMAGE_NAME_SPACES,
  IMAGES,
  DEVICE_MEASUREMENTS,
  SOCKET,
  STATUS_TYPES,
  HTTP_METHODS,
  // env-constants
  ENV_TYPES,
  ENV_KEYS,
  // web-constants
  LEAFLET_ATTRIBUTION,
  LEAFLET_URL,
  COOKIE_TOKEN_KEY,
  COOKIE_OAUTH_STATE_KEY,
  // routing constants
  YGGIO_APPS,
  YGGIO_APP_KEY,
  LOCAL_APP_DOMAIN,
  DEFAULT_APP_URLS,
  LOCAL_APP_PORTS,
  ROUTE_TRIMMED_CHARS,
  INTER_HISTORY_TYPES,
  DEVICE_TYPES,
  RULES_ACTIONS,
  // access constants
  GLOBAL_ACCESS_USER_GROUP_REF,
  GLOBAL_ACCESS_RESOURCE_GROUP_REF,
  PUBLIC_ACCESS_RESOURCE_GROUP_REF,
  ACCESS_USER_GROUP_TYPES,
  ACCESS_RESOURCE_GROUP_TYPES,
  ACCESS_SCOPES,
  ACCESS_RESOURCE_TYPES,
  ACCESS_ORG_UNIT_SCOPES, // needs changes
  ACCESS_ORG_UNIT_RESOURCE_TYPES,

  getExternalUrls,
};
