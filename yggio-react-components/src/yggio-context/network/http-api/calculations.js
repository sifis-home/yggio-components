/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import request from '../http-request';

import {
  REQUEST_METHODS,
  RESOURCE_TYPES,
} from '../../../constants';

// ////
// basic functionality
// ////

const create = token => calculation => request({
  token,
  method: REQUEST_METHODS.post,
  URI: `${RESOURCE_TYPES.calculations}`,
  data: calculation,
});

const fetch = token => () => request({
  token,
  method: REQUEST_METHODS.get,
  URI: RESOURCE_TYPES.calculations
});

const get = token => calculationId => request({
  token,
  method: REQUEST_METHODS.get,
  URI: `${RESOURCE_TYPES.calculations}/${calculationId}`,
});

const update = token => updates => request({
  token,
  method: REQUEST_METHODS.put,
  URI: `${RESOURCE_TYPES.calculations}/${updates._id}`,
  data: updates
});

const remove = token => calculationId => request({
  token,
  method: REQUEST_METHODS.delete,
  URI: `${RESOURCE_TYPES.calculations}/${calculationId}`,
});

const perform = token => (calculationId, calcType, interval) => request({
  token,
  method: REQUEST_METHODS.put,
  URI: `${RESOURCE_TYPES.calculations}/${calculationId}/perform`,
  params: {calcType, interval},
});


// ////
//  exports
// ////

export {
  fetch,
  get,
  update,
  create,
  remove,
  perform,
};
