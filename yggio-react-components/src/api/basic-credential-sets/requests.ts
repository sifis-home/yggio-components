/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {request} from '../request';
import {HTTP_METHODS, RESOURCE_TYPES} from '../../constants';

const createOne = async (basicCredentialsSet: object) => request({
  method: HTTP_METHODS.post,
  URI: `${RESOURCE_TYPES.basicCredentialsSets}`,
  data: basicCredentialsSet,
});

const fetch = async () => request({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.basicCredentialsSets}`,
});

const fetchOne = async (basicCredentialsSetId: string) => request({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.basicCredentialsSets}/${basicCredentialsSetId}`,
});

const remove = async (basicCredentialsSetId: string) => request({
  method: HTTP_METHODS.delete,
  URI: `${RESOURCE_TYPES.basicCredentialsSets}/${basicCredentialsSetId}`,
});


export {
  createOne,
  fetch,
  fetchOne,
  remove,
};
