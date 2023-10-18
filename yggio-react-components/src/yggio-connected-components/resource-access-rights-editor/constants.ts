/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {ScopeItem} from '../../types';

const ACCESS_RIGHT_TYPES: Record<ScopeItem, ScopeItem> = {
  admin: 'admin',
  write: 'write',
  read: 'read',
  peek: 'peek',
};

export {
  ACCESS_RIGHT_TYPES,
};
