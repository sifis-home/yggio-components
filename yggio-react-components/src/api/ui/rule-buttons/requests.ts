/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {request} from '../../request';
import {HTTP_METHODS} from '../../../constants';

import type {RuleButton} from '../../../types';
import type {
  RuleButtonsQuery,
  RuleButtonCreation,
  RuleButtonDeletion,
} from './types';

const URI = 'ui';
const isNextAPI = true;

const get = async ({owner, deviceId}: RuleButtonsQuery) => request<RuleButton[]>({
  method: HTTP_METHODS.get,
  URI: `${URI}/rule-buttons`,
  params: {
    owner,
    deviceId,
  },
  isNextAPI,
});

const create = async ({data}: RuleButtonCreation) => request({
  method: HTTP_METHODS.post,
  URI: `${URI}/rule-buttons`,
  data,
  isNextAPI,
});

const remove = async ({data}: RuleButtonDeletion) => request({
  method: HTTP_METHODS.delete,
  URI: `${URI}/rule-buttons`,
  data,
  isNextAPI,
});

export {
  get,
  create,
  remove,
};
