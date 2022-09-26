/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {request} from '../request';
import {HTTP_METHODS, RESOURCE_TYPES} from '../../constants';
import {ClientApp} from '../../types';

const fetch = async () => request<ClientApp[]>({
  method: HTTP_METHODS.Get,
  URI: RESOURCE_TYPES.clientApps,
});

export {
  fetch,
};
