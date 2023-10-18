/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const ALLOWED_DATA_KEYS = [
  'filterConnector',
  'filterDevEui',
  'filterDeviceModelName',
  'filterName',
  'filterType',
  'filterContextualParameterKey',
  'filterContextualParameterValue',
  'filterQ',
  'columns',
  'currentPage',
  'cursorDirection',
  'cursorId',
  'filterCollapsed',
  'pageSize',
  'sortingField',
  'sortingOrder',
] as const;

const ALLOWED_COLUMN_DATA_KEYS = [
  'property',
  'threshold',
] as const;

const VIEW_TYPES = {
  deviceList: 'deviceList',
  column: 'column',
} as const;

export {
  ALLOWED_DATA_KEYS,
  ALLOWED_COLUMN_DATA_KEYS,
  VIEW_TYPES,
};
