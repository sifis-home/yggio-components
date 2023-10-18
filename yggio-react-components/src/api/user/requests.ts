/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {User} from '../../types';
import {request} from '../request';
import {HTTP_METHODS, RESOURCE_TYPES} from '../../constants';

const fetchTokenUser = async () => request<User>({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.users}/me`,
});

const update = async ({updates}: {updates: Partial<User>}) => request({
  method: HTTP_METHODS.put,
  URI: RESOURCE_TYPES.users,
  data: _.omit(updates, '_id'),
});

export {
  fetchTokenUser,
  update,
};
