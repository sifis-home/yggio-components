/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {combineReducers} from 'redux';

import {actions as authActions, reducer as authReducer} from './auth.redux';
import {actions as appsActions, reducer as appsReducer} from './apps.redux';
import {actions as providersActions, reducer as providersReducer} from './providers.redux';
import {actions as usersActions, reducer as usersReducer} from './users.redux';
import {actions as devicesActions, reducer as devicesReducer} from './devices.redux';
import {actions as locationsActions, reducer as locationsReducer} from './locations.redux';
import {actions as organizationsActions, reducer as organizationsReducer} from './organizations.redux';
import {actions as deviceDetailsActions, reducer as deviceDetailsReducer} from './device-details.redux';
import {actions as accessRightsActions, reducer as accessRightsReducer} from './access-rights.redux';
import {actions as imagesActions, reducer as imagesReducer} from './images.redux';
import {actions as deviceSubscriptionsActions, reducer as deviceSubscriptionsReducer} from './device-subscriptions.redux';
import {actions as jobsActions, reducer as jobsReducer} from './jobs.redux';
import {actions as calculationsActions, reducer as calculationsReducer} from './calculations.redux';
import {actions as channelActions, reducer as channelReducer} from './channels.redux';
import {actions as deviceCommandsActions, reducer as deviceCommandsReducer} from './device-commands.redux';
import {actions as translatorsActions, reducer as translatorsReducer} from './translators.redux';
import {actions as rulesActionsActions, reducer as rulesActionsReducer} from './rules.redux';

import {reducer as deviceTotalCountReducer} from './device-total-count.redux';

const actions = {
  auth: authActions,
  apps: appsActions,
  providers: providersActions,
  accessRights: accessRightsActions,
  users: usersActions,
  devices: devicesActions,
  locations: locationsActions,
  organizations: organizationsActions,
  deviceDetails: deviceDetailsActions,
  images: imagesActions,
  deviceSubscriptions: deviceSubscriptionsActions,
  jobs: jobsActions,
  calculations: calculationsActions,
  channels: channelActions,
  deviceCommands: deviceCommandsActions,
  translators: translatorsActions,
  rulesActions: rulesActionsActions,
};

const reducer = combineReducers({
  auth: authReducer,
  apps: appsReducer,
  providers: providersReducer,
  accessRights: accessRightsReducer,
  users: usersReducer,
  devices: devicesReducer,
  locations: locationsReducer,
  organizations: organizationsReducer,
  deviceDetails: deviceDetailsReducer,
  images: imagesReducer,
  deviceSubscriptions: deviceSubscriptionsReducer,
  jobs: jobsReducer,
  calculations: calculationsReducer,
  channels: channelReducer,
  deviceCommands: deviceCommandsReducer,
  deviceTotalCount: deviceTotalCountReducer,
  translators: translatorsReducer,
  rulesActions: rulesActionsReducer,
});

export {
  actions,
  reducer,
};
