/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

enum StatusTypeNames {
  'info',
  'ok',
  'warning',
  'error',
}

interface StatusType {
  name: StatusTypeNames;
  severity: number;
}
type StatusTypes = Record<StatusTypeNames, StatusType>;


const STATUS_TYPES: StatusTypes = {
  [StatusTypeNames.info]: {name: StatusTypeNames.info, severity: 0},
  [StatusTypeNames.ok]: {name: StatusTypeNames.ok, severity: 1},
  [StatusTypeNames.warning]: {name: StatusTypeNames.warning, severity: 2},
  [StatusTypeNames.error]: {name: StatusTypeNames.error, severity: 3},
};

export default STATUS_TYPES;
export {
  StatusType,
  StatusTypeNames,
};
