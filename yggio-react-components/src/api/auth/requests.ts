/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {request} from '../request';

import {
  HTTP_METHODS,
  RESOURCE_TYPES,
} from '../../constants';
import {AuthCodeProps} from './types';

interface AuthInfo {
  authorizationEndpoint: string;
  clientId: string;
  signoutEndpoint: string;
  redirectURIs: string[];
  scope: string;
}

const getAuthInfo = async () => request<AuthInfo>({
  method: HTTP_METHODS.Get,
  URI: `${RESOURCE_TYPES.auth}/info`,
});

interface AuthCode {
  token: string;
}

const getAuthCode = async ({
  code,
  clientId,
  redirectionEndpoint,
}: AuthCodeProps) => request<AuthCode>({
  method: HTTP_METHODS.Get,
  URI: `${RESOURCE_TYPES.auth}/code`,
  params: {
    code,
    /* eslint-disable camelcase */
    client_id: clientId,
    redirect_uri: redirectionEndpoint,
    /* eslint-enable camelcase */
  },
});

const getTokenUser = async () => request({
  method: HTTP_METHODS.Get,
  URI: `${RESOURCE_TYPES.users}/me`,
});

export {
  getAuthInfo,
  getAuthCode,
  getTokenUser,
};
