/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {actions as apiActions} from '../api-state.redux';

const ACTION_TYPES = {
  dbAppsReplaceOne: 'dbAppsReplaceOne',
  dbAppsReplaceMany: 'dbAppsReplaceMany',
};

const internalActions = {
  replaceApp: app => ({
    type: ACTION_TYPES.dbAppsReplaceOne,
    payload: {app},
  }),

  replaceApps: apps => ({
    type: ACTION_TYPES.dbAppsReplaceMany,
    payload: {apps},
  }),
};

const actions = {
  getApp: appId => async dispatch => {
    const getAppAction = apiActions.apps.get(appId);
    const app = await dispatch(getAppAction);
    dispatch(internalActions.replaceApp(app));
  },

  fetchApps: () => async dispatch => {
    const fetchAppsAction = apiActions.apps.fetch();
    const apps = await dispatch(fetchAppsAction);
    dispatch(internalActions.replaceApps(apps));
  },

};

const defaultState = [];

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case ACTION_TYPES.dbAppsReplaceOne: {
      const {app} = action.payload;
      return {...state, [app._id]: app};
    }

    case ACTION_TYPES.dbAppsReplaceMany: {
      const {apps} = action.payload;
      const replacements = [];
      _.each(apps, app => {
        replacements.push(app);
      });
      return replacements;
    }

    default: {
      return state;
    }
  }
};

export {
  actions,
  reducer,
};
