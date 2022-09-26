/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// users.js

import _ from 'lodash';
import request from '../http-request';

import {
  REQUEST_METHODS,
  RESOURCE_TYPES,
} from '../../../constants';

// the routes that should be in auth

const fetch = token => () => request({
  token,
  method: REQUEST_METHODS.get,
  URI: RESOURCE_TYPES.users,
});

const create = token => ({username, email, password}) => request({
  token,
  method: REQUEST_METHODS.post,
  URI: RESOURCE_TYPES.users,
  data: {username, email, password},
});

const update = token => ({data}) => {
  return request({
    token,
    method: REQUEST_METHODS.put,
    URI: RESOURCE_TYPES.users,
    data: _.omit(data, '_id'),
  });
};

export {
  fetch,
  create,
  update,
};
