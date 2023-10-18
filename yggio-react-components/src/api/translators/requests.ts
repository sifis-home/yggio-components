/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {Translators} from '../../types';
import {request} from '../request';
import {HTTP_METHODS, RESOURCE_TYPES} from '../../constants';

const fetch = async (deviceModelName?: string) => request<Translators>({
  method: HTTP_METHODS.get,
  URI: RESOURCE_TYPES.translators,
  params: {deviceModelName}
});

export {
  fetch,
};
