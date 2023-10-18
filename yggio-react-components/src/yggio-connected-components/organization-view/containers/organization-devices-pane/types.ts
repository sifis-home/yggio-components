/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

interface SourceInfo {
  owner: boolean;
  'public': string;
  global: string;
  orgUnit: {
    unitName: string;
    unitId: string;
  };
  user: string;
  userGroup: string;
  group: string;
  singleton: string;
}

export type {
  SourceInfo,
};
