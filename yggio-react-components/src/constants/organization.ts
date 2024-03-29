﻿/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const ORGANIZATION_ACCESS_TYPES = {
  DEVICES_READ: 'DEVICES_READ',
  DEVICES_WRITE: 'DEVICES_WRITE',
  DEVICES_PEEK: 'DEVICES_PEEK',
  MANAGE_ACCESS: 'MANAGE_ACCESS',
  EMPLACEMENT: 'EMPLACEMENT',
};

const ORG_TAB_ITEMS = {
  summary: 'summary',
  members: 'members',
  devices: 'devices',
  createMember: 'createMember',
  edit: 'edit',
} as const;

export {
  ORGANIZATION_ACCESS_TYPES,
  ORG_TAB_ITEMS,
};
