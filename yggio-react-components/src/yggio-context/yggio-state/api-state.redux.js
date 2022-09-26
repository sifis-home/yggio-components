/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// api-state.redux.js

import _ from 'lodash';
import * as api from '../network/http-api';

import {getYggioToken, removeYggioToken} from '../network/yggio-token';

import {NETWORK_ERROR_MESSAGE} from '../constants';

// Hooking up the connectivity logic is a bit dirty, but is a necessary evil
import {actions as connectivityActions} from './connectivity.redux';
import {actions as messageStackActions} from './message-stack.redux';

const ACTION_TYPES = {
  httpRequest: 'httpRequest',
  httpSuccess: 'httpSuccess',
  httpFailure: 'httpFailure',
};

const actions = _.mapValues(api, (resource, resourceType) => {
  // each resource has a set of routes
  const routes = _.mapValues(resource, (route, routeName) => {
    // each route gets an action
    const action = (...args) => (dispatch, getState) => {

      // NOTE: This caused errors and things seems to be working fine without it
      // WARNING: getState should be generally avoided (double-dipping)
      // This (ensuring connection) should be one of very few exceptions
      // const connectivityState = _.isFunction(getState) && getState().connectivity.connectivityState;
      // MAYBE this should not be done, or be opt-in/out (?)
      // if (connectivityState && connectivityState !== CONNECTIVITY_STATES.connected) {
      // give the calling action/component to handle error (so success cannot be inferred)
      // return Promise.reject(CONNECTIVITY_ERROR);
      // }

      // OTHERWISE: after pre-check, perform the api call
      const token = getYggioToken();
      dispatch({
        type: ACTION_TYPES.httpRequest,
        payload: {resourceType, routeName},
      });
      return route(token)(...args)
        .then(res => {
          dispatch({
            type: ACTION_TYPES.httpSuccess,
            payload: {resourceType, routeName, res},
          });

          return res;
        })
        .catch(async err => {
          const responseStatus = _.get(err, 'response.status');
          // if not authorized --> wipe local identity
          if (responseStatus === 401) {
            removeYggioToken();
          }
          // if connection not found --> notify connectivity management
          if (err.message === NETWORK_ERROR_MESSAGE) { // check for network error
            dispatch(connectivityActions.setOffline());
          }
          // all other general system-wide error-handling
          dispatch({
            type: ACTION_TYPES.httpFailure,
            payload: {resourceType, routeName, err},
          });
          // raise an error toast
          dispatch(messageStackActions.pushMessage(err));
          // and throw for possible custom handling down the line
          throw err;
        });
    };
    return action;
  });
  return routes;
});


const defaultState = _.mapValues(api, resource => _.mapValues(resource, () => ({
  res: null,
  err: null,
  isLoading: false,
})));

const reducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {

    case ACTION_TYPES.httpRequest: {
      const {resourceType, routeName} = payload;
      const nextState = {
        ...state,
        [resourceType]: {
          ...(state[resourceType]),
          [routeName]: {
            ...(state[resourceType][routeName]),
            isLoading: true,
          },
        },
      };
      return nextState;
    }

    case ACTION_TYPES.httpSuccess: {
      const {resourceType, routeName, res} = payload;
      const nextState = {
        ...state,
        [resourceType]: {
          ...(state[resourceType]),
          [routeName]: {
            res,
            err: null,
            isLoading: false,
          },
        },
      };
      return nextState;
    }

    case ACTION_TYPES.httpFailure: {
      const {resourceType, routeName, err} = payload;
      const nextState = {
        ...state,
        [resourceType]: {
          ...(state[resourceType]),
          [routeName]: {
            res: null,
            err,
            isLoading: false,
          },
        },
      };
      return nextState;
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
