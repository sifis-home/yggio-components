/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {request} from '../../request';
import {HTTP_METHODS} from '../../../constants';

import type {
  ThemesQuery,
  ThemeCreation,
  ThemeUpdate,
  ThemeDeletion,
} from './types';
import type {Theme} from '../../../types';

const URI = 'ui';
const isNextAPI = true;

const get = async ({orgId}: ThemesQuery) => request<Theme[]>({
  method: HTTP_METHODS.get,
  URI: `${URI}/themes`,
  params: {
    orgId,
  },
  isNextAPI,
});

const create = async ({data}: ThemeCreation) => request({
  method: HTTP_METHODS.post,
  URI: `${URI}/themes`,
  data,
  isNextAPI,
});

const update = async ({data}: ThemeUpdate) => request({
  method: HTTP_METHODS.put,
  URI: `${URI}/themes`,
  data,
  isNextAPI,
});

const remove = async ({data}: ThemeDeletion) => request({
  method: HTTP_METHODS.delete,
  URI: `${URI}/themes`,
  data,
  isNextAPI,
});

export {
  get,
  create,
  update,
  remove,
};
