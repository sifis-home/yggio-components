/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {request} from '../request';
import {
  RESOURCE_TYPES,
  HTTP_METHODS,
} from '../../constants';
import {ResourceAccessRight, SubjectAccessRight} from '../../types';
import {AccessRightCreationTemplate, AccessRightDeletionParams} from './types';

interface FetchResourceParams {
  resourceId: string;
  resourceType: string;
}

const fetchResourceAccessRights = async ({resourceId, resourceType}: FetchResourceParams) => request<ResourceAccessRight[]>({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.accessRights}/resource/${resourceId}`,
  params: {resourceType}
});

interface FetchSubjectAccessRightsParams {
  subjectId: string;
  subjectType: 'user' | 'group';
  resourceType: string;
}

const fetchSubjectAccessRights = async ({subjectId, subjectType, resourceType}: FetchSubjectAccessRightsParams) => request<SubjectAccessRight[]>({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.accessRights}/subject/${subjectId}`,
  params: {subjectType, resourceType}
});

const createAccessRight = async (template: AccessRightCreationTemplate) => request({
  method: HTTP_METHODS.post,
  URI: `${RESOURCE_TYPES.accessRights}/resource`,
  data: template,
});

const removeAccessRight = async (params: AccessRightDeletionParams) => request({
  method: HTTP_METHODS.delete,
  URI: `${RESOURCE_TYPES.accessRights}/resource`,
  params,
});

export {
  fetchResourceAccessRights,
  fetchSubjectAccessRights,
  createAccessRight,
  removeAccessRight,
};
