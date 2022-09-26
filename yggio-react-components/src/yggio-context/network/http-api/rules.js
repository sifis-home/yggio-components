/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// rules.js

import {toast} from 'react-hot-toast';

import request from '../http-request';
import {
  REQUEST_METHODS,
  RESOURCE_TYPES,
} from '../../../constants';

const create = token => async template => {
  const {rule, action} = template;

  const actionResult = await request({
    token,
    method: REQUEST_METHODS.post,
    URI: `${RESOURCE_TYPES.rulesActions}`,
    data: action,
  });

  const ruleResult = await request({
    token,
    method: REQUEST_METHODS.post,
    URI: `${RESOURCE_TYPES.rules}`,
    data: {
      ...rule,
      events: [{action: actionResult._id}],
    },
  });
  return ruleResult;
};


const fetch = token => () => request({
  token,
  method: REQUEST_METHODS.get,
  URI: `${RESOURCE_TYPES.rules}`,
});


const remove = token => async (ruleId, actionId) => {
  await request({
    token,
    method: REQUEST_METHODS.delete,
    URI: `${RESOURCE_TYPES.rulesActions}/${actionId}`,
  });
  await request({
    token,
    method: REQUEST_METHODS.delete,
    URI: `${RESOURCE_TYPES.rules}/${ruleId}`,
  });
  return ruleId;
};

const activate = token => async ruleId => {
  const res = await request({
    token,
    method: REQUEST_METHODS.put,
    URI: `${RESOURCE_TYPES.rules}/activate/${ruleId}`,
    data: {ok: true},
  });

  // Kinda dirty hack for special toaster trigger
  if (res.ok) {
    const successMessage = 'Action triggered successfully';
    toast.success(successMessage);
  }
};

// ////
//  exports
// ////

export {
  fetch,
  create,
  remove,
  activate,
};
