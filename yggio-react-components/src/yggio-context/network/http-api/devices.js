/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// devices.js

import request from '../http-request';

import {
  REQUEST_METHODS,
  RESOURCE_TYPES,
} from '../../../constants';

const fetch = token => (
  limit,
  offset = 0,
  orderBy = 'name',
  filter,
) => request({
  token,
  method: REQUEST_METHODS.get,
  URI: RESOURCE_TYPES.iotnodes,
  params: {
    limit,
    offset,
    orderBy,
    ...filter,
    options: 'count',
  }
});

const peek = token => () => request({
  token,
  method: REQUEST_METHODS.get,
  URI: `${RESOURCE_TYPES.iotnodes}/peek`,
});

const seek = token => ({deviceItems}) => request({
  token,
  method: REQUEST_METHODS.put,
  URI: `${RESOURCE_TYPES.iotnodes}/seek`,
  data: deviceItems,
});

const create = token => ({template}) => request({
  token,
  method: REQUEST_METHODS.post,
  URI: `${RESOURCE_TYPES.iotnodes}`,
  data: template,
});

const batchCreate = token => ({template}) => request({
  token,
  method: REQUEST_METHODS.post,
  URI: `${RESOURCE_TYPES.iotnodes}/batch`,
  data: template,
});

const get = token => ({deviceId}) => request({
  token,
  method: REQUEST_METHODS.get,
  URI: `${RESOURCE_TYPES.iotnodes}/${deviceId}`,
});

const update = token => ({deviceId, updates}) => request({
  token,
  method: REQUEST_METHODS.put,
  URI: `${RESOURCE_TYPES.iotnodes}/${deviceId}`,
  data: updates,
});

const remove = token => ({deviceId}) => request({
  token,
  method: REQUEST_METHODS.delete,
  URI: `${RESOURCE_TYPES.iotnodes}/${deviceId}`,
});

const removeMany = token => async deviceIds => {
  const removeMany = _.map(deviceIds, id => (
    request({
      token,
      method: REQUEST_METHODS.delete,
      URI: `${RESOURCE_TYPES.iotnodes}/${id}`,
    })
  ));
  await Promise.all(removeMany);
};

const sendCommand = token => ({command, data}) => request({
  token,
  method: REQUEST_METHODS.put,
  URI: `${RESOURCE_TYPES.iotnodes}/command`,
  data: {
    command,
    ...data,
  },
});

const getModelNames = token => () => request({
  token,
  method: REQUEST_METHODS.get,
  URI: `${RESOURCE_TYPES.iotnodes}/models`,
});

// dirty from here down

const getStatistics = token => (deviceId, measurement, start, end, distance) => request({
  token,
  method: REQUEST_METHODS.get,
  URI: `${RESOURCE_TYPES.iotnodes}/${deviceId}/stats`,
  params: {measurement, start, end, distance},
});

const getStatisticsFields = token => deviceId => request({
  token,
  method: REQUEST_METHODS.get,
  URI: `${RESOURCE_TYPES.iotnodes}/${deviceId}/stats/fields`,
});

export {
  create,
  batchCreate,
  fetch,
  peek,
  seek,
  get,
  update,
  remove,
  removeMany,
  sendCommand,
  getModelNames,
  getStatistics,
  getStatisticsFields,
};
