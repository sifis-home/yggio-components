/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {formatDistance, parseISO, getUnixTime} from 'date-fns';

import createReducer from './create-reducer';
import createStateLogger from './state-logger';
import createActionDispatches from './create-action-dispatches';
import objectToQueryString from './object-to-query-string';
import resolveDeviceType from './resolve-device-type';
import {generateUUID} from './generate-uuid';
import getRequestErrorMessage from './get-request-error-message';
import insertDeviceIntoLocation from './insert-device-into-location';
import getDeviceStatus from './get-device-status';
import parseDeltaControlsSettings from './parse-delta-controls-settings';
import {
  multiply,
  divide,
} from './general';
import organizationUtils from './organizations';

const formatTimeSinceLastReported = reportedAt => {
  if (!reportedAt) {
    return 'Never';
  }

  const unixReportedAt = getUnixTime(parseISO(reportedAt));
  const unixNow = getUnixTime(new Date());

  if (unixReportedAt > unixNow) {
    return `in ${formatDistance(new Date(), parseISO(reportedAt))}`;
  }
  if (unixReportedAt <= unixNow) {
    return `${formatDistance(new Date(), parseISO(reportedAt))} ago`;
  }
};

export {
  createReducer,
  createStateLogger,
  createActionDispatches,
  objectToQueryString,
  resolveDeviceType,
  multiply,
  divide,
  generateUUID,
  formatTimeSinceLastReported,
  getRequestErrorMessage,
  insertDeviceIntoLocation,
  getDeviceStatus,
  parseDeltaControlsSettings,
  organizationUtils,
};
