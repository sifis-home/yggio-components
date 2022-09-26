/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
type Scope = 'read' | 'write' | 'admin' | 'peek';

interface AccessRight {
  _id?: string;
  name?: string;
  scope: Scope[];
  userId: string;
  subjectType: string;
}

type AccessRights = AccessRight[];

export {
  AccessRight,
  AccessRights,
  Scope,
};
