/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {request} from './request';

import {userApi, userRequests} from './user';
import {devicesApi, devicesRequests} from './devices';
import {calculationsApi, calculationsRequests} from './calculations';
import {accessRightsApi, accessRightsRequests} from './access-rights';
import {locationsRequests, locationsApi} from './locations';
import {organizationsRequests, organizationsApi} from './organizations';
import {channelsApi, channelsRequests} from './channels';
import {usersApi, usersRequests} from './users';
import {rulesApi, rulesRequests} from './rules';
import {translatorsApi, translatorsRequests} from './translators';
import {authApi, authRequests} from './auth';
import {clientAppsApi, clientAppsRequests} from './client-apps';
import {requestBodySizeLimitRequests, requestBodySizeLimitApi} from './request-body-size-limit';
import {jobApi, jobRequests} from './jobs';

import {getYggioToken, setYggioToken, removeYggioToken, getUserId} from './token';

import {WebSocket} from './websocket';

export {
  request,

  userApi,
  userRequests,

  devicesApi,
  devicesRequests,

  calculationsApi,
  calculationsRequests,

  accessRightsApi,
  accessRightsRequests,

  locationsApi,
  locationsRequests,

  organizationsRequests,
  organizationsApi,

  channelsApi,
  channelsRequests,

  usersApi,
  usersRequests,

  rulesApi,
  rulesRequests,

  translatorsApi,
  translatorsRequests,

  authApi,
  authRequests,

  jobApi,
  jobRequests,

  clientAppsApi,
  clientAppsRequests,

  getYggioToken,
  setYggioToken,
  removeYggioToken,
  getUserId,

  WebSocket,

  requestBodySizeLimitRequests,
  requestBodySizeLimitApi,

};
