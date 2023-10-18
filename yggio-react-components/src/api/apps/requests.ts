/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {AccessTypes} from 'yggio-types';
import type {AppTypes} from 'yggio-models';

import {request, requestBodyAndHeaders} from '../request';
import {HTTP_METHODS, RESOURCE_TYPES} from '../../constants';
import type {FetchProps} from './types';

const fetch = async (
  params: FetchProps,
) => requestBodyAndHeaders<AppTypes.AppWithId[]>({
  method: HTTP_METHODS.get,
  URI: RESOURCE_TYPES.apps,
  params,
});

const fetchOne = async (
  _id: string,
) => request<AppTypes.AppWithId[]>({
  method: HTTP_METHODS.get,
  URI: RESOURCE_TYPES.apps,
  params: {matchPattern: {strictMatch: true, _id}},
});

const create = async (data: Partial<AppTypes.AppInput>) => request<AppTypes.App[]>({
  method: HTTP_METHODS.post,
  URI: RESOURCE_TYPES.apps,
  data,
});

const update = async ({appId, updates}: {appId: string, updates: Partial<AppTypes.AppUpdate>}) => request<AppTypes.App[]>({
  method: HTTP_METHODS.put,
  URI: `${RESOURCE_TYPES.apps}/${appId}`,
  data: updates,
});

const remove = async (appId: string) => request({
  method: HTTP_METHODS.delete,
  URI: `${RESOURCE_TYPES.apps}/${appId}`,
});

// TODO: Access requests should use the dedicated access routes instead

const createAccess = async ({
  appId,
  updates,
}: {appId: string, updates: object}) => request({
  method: HTTP_METHODS.post,
  URI: `${RESOURCE_TYPES.apps}/access/${appId}`,
  data: updates
});

const removeAccess = async ({
  appId,
  updates,
}: {appId: string, updates: object}) => request({
  method: HTTP_METHODS.delete,
  URI: `${RESOURCE_TYPES.apps}/access/${appId}`,
  data: updates,
});

const fetchResourceAccess = async ({
  resourceId,
}: {resourceId: string}) => request<AccessTypes.ResourceAccess[]>({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.apps}/access/resource/${resourceId}`,
});

const fetchSubjectAccess = async ({
  subjectId,
}: {subjectId: string}) => request({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.apps}/access/subject/${subjectId}`,
});

export {
  fetch,
  fetchOne,
  create,
  update,
  remove,

  createAccess,
  removeAccess,
  fetchResourceAccess,
  fetchSubjectAccess,
};
