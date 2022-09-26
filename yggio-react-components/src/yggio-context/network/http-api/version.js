/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// version.js

import request from '../http-request';

import {
  REQUEST_METHODS,
  RESOURCE_TYPES,
} from '../../../constants';

const getVersion = () => () => {
  const requestConfig = {
    method: REQUEST_METHODS.get,
    URI: RESOURCE_TYPES.version,
  };
  return request(requestConfig, {isNonApiRoute: true});
};

export {
  getVersion,
};
