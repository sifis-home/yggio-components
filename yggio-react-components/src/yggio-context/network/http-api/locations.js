/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// locations.js

import request from '../http-request';

import {
  REQUEST_METHODS,
  RESOURCE_TYPES,
} from '../../../constants';

// ////
// basic functionality
// ////

const create = token => location => request({
  token,
  method: REQUEST_METHODS.post,
  URI: `${RESOURCE_TYPES.locations}`,
  data: location,
});

const fetch = token => () => request({
  token,
  method: REQUEST_METHODS.get,
  URI: RESOURCE_TYPES.locations
});

const get = token => locationId => request({
  token,
  method: REQUEST_METHODS.get,
  URI: `${RESOURCE_TYPES.locations}/${locationId}`,
});

const update = token => updates => request({
  token,
  method: REQUEST_METHODS.put,
  URI: `${RESOURCE_TYPES.locations}/${updates._id}`,
  data: updates
});

const remove = token => locationId => request({
  token,
  method: REQUEST_METHODS.delete,
  URI: `${RESOURCE_TYPES.locations}/${locationId}`,
});


// ////
//  exports
// ////

export {
  // locations
  fetch,
  get,
  update,
  create,
  remove,
};
