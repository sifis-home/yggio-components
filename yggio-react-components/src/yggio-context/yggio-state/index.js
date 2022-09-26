/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {combineReducers} from 'redux';

import {
  reducer as coreSettingsReducer, actions as coreSettingsActions,
} from './core-settings.redux';

import {
  reducer as apiStateReducer, actions as apiStateActions,
} from './api-state.redux';

import {
  reducer as databaseReducer, actions as databaseActions,
} from './database.redux';

import {
  reducer as connectivityReducer, actions as connectivityActions,
} from './connectivity.redux';

import {
  reducer as messageStackReducer, actions as messageStackActions,
} from './message-stack.redux';

import {
  reducer as appHistoryReducer, actions as appHistoryActions,
} from './app-history.redux';

const actions = {
  coreSettings: coreSettingsActions,
  apiState: apiStateActions,
  database: databaseActions,
  connectivity: connectivityActions,
  messageStack: messageStackActions,
  appHistory: appHistoryActions,
};

const reducer = combineReducers({
  coreSettings: coreSettingsReducer,
  apiState: apiStateReducer,
  database: databaseReducer,
  connectivity: connectivityReducer,
  messageStack: messageStackReducer,
  appHistory: appHistoryReducer,
});

export {
  actions,
  reducer,
};
