/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */


import {ScopeItem, ResourceType, CreateSubjectType} from '../../types';

interface AccessRightCreationTemplate {
  resourceId: string;
  scope: readonly ScopeItem[];
  subjectId: string;
  subjectType: CreateSubjectType;
  resourceType: ResourceType;
}

interface AccessRightDeletionParams {
  resourceId: string;
  scope: readonly ScopeItem[];
  subjectId: string;
  subjectType: CreateSubjectType;
  resourceType: ResourceType;
}

export type {
  AccessRightCreationTemplate,
  AccessRightDeletionParams,
};
