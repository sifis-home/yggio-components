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
  dbProvidersSetMany: 'dbProvidersSetMany',
};

const internalActions = {
  setProviders: providers => ({
    type: ACTION_TYPES.dbProvidersSetMany,
    payload: {providers},
  }),
};

const actions = {
  fetchProviders: () => async dispatch => {
    const fetchProvidersAction = apiActions.providers.fetch();
    const Providers = await dispatch(fetchProvidersAction);
    dispatch(internalActions.setProviders(Providers));
  },
};

const defaultState = [];

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case ACTION_TYPES.dbProvidersSetMany: {
      const {providers} = action.payload;
      const replacements = [];
      _.each(providers, app => {
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
