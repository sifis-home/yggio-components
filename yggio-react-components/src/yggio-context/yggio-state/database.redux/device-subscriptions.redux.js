/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// subscriptions.redux.js

import _ from 'lodash';
import {subscribe} from '../../network/socketio';

const ACTION_TYPES = {
  dbSubscriptionsRemove: 'dbSubscriptionsRemove',
  dbSubscriptionsCreate: 'dbSubscriptionsCreate',
};

const actions = {
  removeSubscriptions: deviceIds => dispatch => dispatch({
    type: ACTION_TYPES.dbSubscriptionsRemove,
    payload: {deviceIds},
  }),
  createSubscriptions: deviceIds => dispatch => {
    subscribe(deviceIds);
    dispatch({
      type: ACTION_TYPES.dbSubscriptionsCreate,
      payload: {deviceIds},
    });
  },
};

const defaultState = {};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case ACTION_TYPES.dbSubscriptionsRemove: {
      const {deviceIds} = action.payload;
      return _.omit(state, deviceIds);
    }

    case ACTION_TYPES.dbSubscriptionsCreate: {
      const {deviceIds} = action.payload;
      const subscriptions = _.reduce(deviceIds, (acc, deviceId) => {
        acc[deviceId] = true;
        return acc;
      }, {});
      return {...state, ...subscriptions};
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
