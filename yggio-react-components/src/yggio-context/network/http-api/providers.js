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

const fetch = token => () => request({
  token,
  method: REQUEST_METHODS.get,
  URI: `${RESOURCE_TYPES.providers}`,
  params: {
    filtered: true,
  }
});

export {
  fetch,
};
