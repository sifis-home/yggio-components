/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {formatDistance, parseISO, getUnixTime} from 'date-fns';

import createReducer from './create-reducer';
import createStateLogger from './state-logger';
import {isValidLength} from './validation';
import createActionDispatches from './create-action-dispatches';
import memoizedInputsChecker from './memoized-inputs-checker';
import parseCsvFileToJson from './parse-csv-file-too-json';
import objectToQueryString from './object-to-query-string';
import organizationUtils from './organization-utils';
import resolveDeviceType from './resolve-device-type';
import {generateUUID} from './generate-uuid';
import createIdKeyedObject from './create-id-keyed-object';
import getRequestErrorMessage from './get-request-error-message';
import insertDeviceIntoLocation from './insert-device-into-location';
import getDeviceStatus from './get-device-status';

import {
  getFullImageUrl,
  getBlueprintImageUrl,
  getDeviceIconUrl,
  getLocationIconUrl,
} from './images';

import {
  multiply,
  divide,
} from './general';

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
  isValidLength,
  createActionDispatches,
  memoizedInputsChecker,
  parseCsvFileToJson,
  getFullImageUrl,
  getBlueprintImageUrl,
  getDeviceIconUrl,
  getLocationIconUrl,
  objectToQueryString,
  organizationUtils,
  resolveDeviceType,
  multiply,
  divide,
  generateUUID,
  createIdKeyedObject,
  formatTimeSinceLastReported,
  getRequestErrorMessage,
  insertDeviceIntoLocation,
  getDeviceStatus,
};
