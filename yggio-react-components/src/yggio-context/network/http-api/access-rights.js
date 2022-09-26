/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// access-rights.js

import request from '../http-request';

import {
  REQUEST_METHODS,
  RESOURCE_TYPES,
} from '../../../constants';

const fetchResource = token => ({deviceId}) => request({
  token,
  method: REQUEST_METHODS.get,
  URI: `${RESOURCE_TYPES.iotnodes}/${deviceId}/${RESOURCE_TYPES.access}`,
});

const fetchSubject = token => ({subjectId}) => request({
  token,
  method: REQUEST_METHODS.get,
  URI: `${RESOURCE_TYPES.iotnodes}/${RESOURCE_TYPES.access}/${subjectId}`,
});

const create = token => ({deviceId, template}) => request({
  token,
  method: REQUEST_METHODS.post,
  URI: `${RESOURCE_TYPES.iotnodes}/${deviceId}/${RESOURCE_TYPES.access}`,
  data: template,
});

const remove = token => ({deviceId, scope, subjectId, subjectType}) => request({
  token,
  method: REQUEST_METHODS.delete,
  URI: `${RESOURCE_TYPES.iotnodes}/${deviceId}/${RESOURCE_TYPES.access}`,
  params: {scope, subjectId, subjectType},
});

export {
  fetchResource,
  fetchSubject,
  create,
  remove,
};
