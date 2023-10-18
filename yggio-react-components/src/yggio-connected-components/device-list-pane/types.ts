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
