/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// channels.js

import request from '../http-request';

import {
  REQUEST_METHODS,
  RESOURCE_TYPES,
} from '../../../constants';

const create = token => channel => request({
  token,
  method: REQUEST_METHODS.post,
  URI: `${RESOURCE_TYPES.channels}`,
  data: channel,
});


const get = token => iotnode => request({
  token,
  method: REQUEST_METHODS.get,
  URI: `${RESOURCE_TYPES.channels}`,
  params: {
    iotnode,
    formatReadable: true,
  }
});


const remove = token => channelId => request({
  token,
  method: REQUEST_METHODS.delete,
  URI: `${RESOURCE_TYPES.channels}/${channelId}`,
});


// ////
//  exports
// ////

export {
  get,
  create,
  remove,
};
