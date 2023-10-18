/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */


import {accessRights} from 'yggio-core-constants';

const {ACCESS_SCOPES, ACCESS_RESOURCE_TYPES, ACCESS_USER_GROUP_TYPES} = accessRights;

type ScopeItem = typeof ACCESS_SCOPES[keyof typeof ACCESS_SCOPES];
type ResourceType = typeof ACCESS_RESOURCE_TYPES[keyof typeof ACCESS_RESOURCE_TYPES];
type CreateSubjectType = typeof ACCESS_USER_GROUP_TYPES[keyof typeof ACCESS_USER_GROUP_TYPES];

interface ResourceAccessRight {
  scope: ScopeItem[];
  userId: string;
  subjectType: string; // TODO: type!
  resourceType: ResourceType;
}

interface SubjectAccessRight {
  scope: ScopeItem[];
  resourceId: string;
  resourceType: ResourceType;
}

export type {
  ResourceAccessRight,
  SubjectAccessRight,
  ScopeItem,
  ResourceType,
  CreateSubjectType,
};
