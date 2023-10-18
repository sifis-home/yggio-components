/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {Device, RuleButton} from '../../types';
import {COLUMNS} from './constants';
import {DeviceStatus} from '../../utils/get-device-status';

interface DecoratedDevice extends Device {
  status: DeviceStatus | undefined;
  values: string[];
  ruleButtons: RuleButton[];
  isCurrentUserOwner: boolean;
}

type Column = typeof COLUMNS[keyof typeof COLUMNS];

interface ListStateProps {
  setColumns: (columns: Column[]) => void;
  setCursorId: (id: string | null) => void;
  setCursorDirection: (dir: string | null) => void;
  setFilterCollapsed: (name: string) => void;
  filterCollapsed: Record<string, boolean>;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSortingField: (field: string) => void;
  setSortingOrder: (order: string) => void;
  reset: () => void;
}

export type {
  DecoratedDevice,
  Column,
  ListStateProps,
};
