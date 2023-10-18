/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {accessRights} from 'yggio-core-constants';
import {
  RESOURCE_SCOPES,
} from '../constants';

const {
  ACCESS_RESOURCE_GROUP_TYPES,
} = accessRights;

type ResourceGroupTypes = keyof typeof ACCESS_RESOURCE_GROUP_TYPES;

interface AccessTokens {
  memberId: string;
  unitId: string;
  accessType: string;
}

interface Group {
  groupId: string;
}

interface OrganizationUnit {
  _id: string;
  parentUnit: string;
  name: string;
  description: string;
  children: OrganizationUnit[];
  groups: Group[];
}

interface Organization {
  name: string;
  accessTokens: AccessTokens[];
  description: string;
  members: string[];
  ownerId: string;
  rootUnit: OrganizationUnit;
  createdAt: string;
  updatedAt: string;
  version: number;
  _id: string;
}

interface OrganizationDevice {
  resourceId: string;
  deviceId: string;
  deviceName: string;
  rights: string[];
  access: keyof typeof RESOURCE_SCOPES;
  unitId: string,
  unitName: string,
}

interface DeviceDetailAccess {
  resourceGroupRef: string;
  resourceGroupType: ResourceGroupTypes;
  userGroupRef: string;
  userGroupType: string;
}

interface DeviceDetail {
  admin: DeviceDetailAccess[];
  write: DeviceDetailAccess[];
  read: DeviceDetailAccess[];
  peek: DeviceDetailAccess[];
  resourceId: string;
}

type Organizations = Organization[];
type IdKeyedOrganizations = {[_id: string]: Organization};

export type {
  Organization,
  OrganizationUnit,
  OrganizationDevice,
  DeviceDetail,
  Organizations,
  DeviceDetailAccess,
  IdKeyedOrganizations,
};
