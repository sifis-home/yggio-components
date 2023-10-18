/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {ReactNode} from 'react';

interface CollapsibleProps {
  label: ReactNode// object | string;
  open?: boolean;
  openedHeight?: string;
  closedHeight?: string;
  onClick: () => void;
  children?: ReactNode;
}

export type {
  CollapsibleProps,
};
