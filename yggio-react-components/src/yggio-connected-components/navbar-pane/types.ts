import {DROPDOWN_NAMES} from './constants';

type DropdownName = typeof DROPDOWN_NAMES[keyof typeof DROPDOWN_NAMES];

export type {
  DropdownName,
};
