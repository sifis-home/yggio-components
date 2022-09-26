/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import cookie from 'js-cookie';

import {getConfig} from '../../yggio-config';
import {COOKIE_TOKEN_KEY} from '../../constants';

const getYggioToken = () => {
  const cookieToken = cookie.getJSON(COOKIE_TOKEN_KEY, {domain: getConfig().domain});
  return cookieToken;
};

const setYggioToken = token => {
  cookie.set(COOKIE_TOKEN_KEY, token, {domain: getConfig().domain});
  const next = cookie.get(COOKIE_TOKEN_KEY, {domain: getConfig().domain});
};

const removeYggioToken = () => {
  cookie.remove(COOKIE_TOKEN_KEY, {domain: getConfig().domain});
};

export {
  getYggioToken,
  setYggioToken,
  removeYggioToken,
};
