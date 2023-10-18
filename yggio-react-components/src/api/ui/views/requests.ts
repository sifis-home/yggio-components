/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {request} from '../../request';
import {HTTP_METHODS} from '../../../constants';

import type {ViewCreation, ViewIdQuery, ViewUpdateQuery, ViewQuery} from '../../../types';

const URI = 'ui';
const isNextAPI = true;

const get = async <T>({type, orgId}: ViewQuery) => request<T>({
  method: HTTP_METHODS.get,
  URI: `${URI}/views`,
  params: {
    type,
    orgId,
  },
  isNextAPI,
});

const create = async (data: ViewCreation) => request({
  method: HTTP_METHODS.post,
  URI: `${URI}/views`,
  data,
  isNextAPI,
});

const update = async ({_id, data}: ViewUpdateQuery) => request({
  method: HTTP_METHODS.put,
  URI: `${URI}/views/${_id}`,
  data,
  isNextAPI,
});

const remove = async ({_id}: ViewIdQuery) => request({
  method: HTTP_METHODS.delete,
  URI: `${URI}/views/${_id}`,
  isNextAPI,
});

export {
  get,
  create,
  update,
  remove,
};
