/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import cookie from 'js-cookie';
import _ from 'lodash';
import decode from 'jwt-decode';

import {getConfig} from '../yggio-config';
import {COOKIE_TOKEN_KEY} from '../constants';

const getYggioToken = () => {
  return cookie.get(COOKIE_TOKEN_KEY);
};

const setYggioToken = (token: string) => {
  cookie.set(COOKIE_TOKEN_KEY, token, {domain: getConfig().domain});
};

const removeYggioToken = () => {
  cookie.remove(COOKIE_TOKEN_KEY, {domain: getConfig().domain});
};

interface DecodedToken {
  sub: string; // subject ID
}

const getUserId = () => {
  const token: string | undefined = cookie.get(COOKIE_TOKEN_KEY);
  if (!token) {
    return null;
  }
  const decodedToken: DecodedToken = decode(token);
  return _.get(decodedToken, 'sub');
};

export {
  getYggioToken,
  setYggioToken,
  removeYggioToken,
  getUserId,
};
