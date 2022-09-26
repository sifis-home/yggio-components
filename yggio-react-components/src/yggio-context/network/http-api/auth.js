/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// auth.js

import request from '../http-request';

import {
  REQUEST_METHODS,
  RESOURCE_TYPES,
} from '../../../constants';

const info = () => () => {
  const requestConfig = {
    method: REQUEST_METHODS.get,
    URI: `${RESOURCE_TYPES.auth}/info`,
  };
  return request(requestConfig, {isNonApiRoute: true});
};

const code = () => ({
  code,
  clientId,
  redirectionEndpoint,
}) => {
  const requestConfig = {
    method: REQUEST_METHODS.get,
    URI: `${RESOURCE_TYPES.auth}/code`,
    params: {
      code,
      client_id: clientId,
      redirect_uri: redirectionEndpoint,
    }
  };
  return request(requestConfig, {isNonApiRoute: true});
};

const localLogin = () => ({username, password}) => {
  const requestConfig = {
    method: REQUEST_METHODS.post,
    URI: `${RESOURCE_TYPES.auth}/local`,
    data: {username, password},
  };
  return request(requestConfig, {isNonApiRoute: true});
};

const getTokenUser = token => () => {
  const requestConfig = {
    token,
    method: REQUEST_METHODS.get,
    URI: `${RESOURCE_TYPES.users}/me`,
  };
  return request(requestConfig);
};

export {
  info,
  code,
  localLogin,
  getTokenUser,
};
