/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// GENERAL

const PAGE_SIZES = {
  20: 20,
  50: 50,
  100: 100,
};

const TYPE_FILTER_OPTIONS = [
  {value: 'error', label: 'Error'},
  {value: 'warning', label: 'Warning'},
  {value: 'info', label: 'Info'},
];

const PRIORITY_FILTER_OPTIONS = [
  {value: 'severe', label: 'Severe'},
  {value: 'high', label: 'High'},
  {value: 'medium', label: 'Medium'},
  {value: 'low', label: 'Low'},
];

const CATEGORY_FILTER_OPTIONS = [
  {value: 'status', label: 'Status'},
  {value: 'update', label: 'Update'},
  {value: 'command', label: 'Command'},
  {value: 'access', label: 'Access'},
  {value: 'analytics', label: 'Analytics'},
  {value: 'rule', label: 'Rule'},
];

const VERIFIED_FILTER_VALUES = {
  verified: 'verified',
  unverified: 'unverified',
} as const;

const VERIFIED_FILTER_OPTIONS = [
  {value: 'verified', label: 'Verified'},
  {value: 'unverified', label: 'Unverified'},
];

export {
  PAGE_SIZES,
  TYPE_FILTER_OPTIONS,
  PRIORITY_FILTER_OPTIONS,
  CATEGORY_FILTER_OPTIONS,
  VERIFIED_FILTER_VALUES,
  VERIFIED_FILTER_OPTIONS,
};
