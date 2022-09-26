/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// connectivity.redux.js

import _ from 'lodash';
import delay from 'delay';
import {version as versionApi} from '../network/http-api';

import {CONNECTIVITY_STATES} from '../../constants';

const CONNECTION_ATTEMPT_PERIOD = 1000; // ms

const ACTION_TYPES = {
  connectivitySetState: 'connectivitySetState',
  activateConnectivity: 'activateConnectivity',
  deactivateConnectivity: 'deactivateConnectivity',
};

const internalActions = {
  setConnectivityState: connectivityState => {
    // perform a perfunctory sanity check
    if (!_.includes(CONNECTIVITY_STATES, connectivityState)) {
      throw new Error(`DevErr: Invalid connectivity state: ${connectivityState}`);
    }
    return {
      type: ACTION_TYPES.connectivitySetState,
      payload: {connectivityState},
    };
  },
  activateConnectivity: () => ({
    type: ACTION_TYPES.activateConnectivity,
  }),
  deactivateConnectivity: () => ({
    type: ACTION_TYPES.deactivateConnectivity,
  }),
};

// local state - tries to reconnect
let isConnecting = false; // STATEFUL!!
const recursiveAttemptReconnect = async dispatch => {
  if (!isConnecting) {
    return; // done - do nothing
  }
  // getVersion - simple api call that should work if connection is possible
  let err;
  try {
    const res = await versionApi.getVersion()();
  } catch (e) {
    err = e;
  }
  // if we do not have an error, then we are done
  // and either record or recurse
  if (!err) {
    // check to make sure connection attempt was not externally cancelled during await
    if (isConnecting) {
      dispatch(internalActions.setConnectivityState(CONNECTIVITY_STATES.connected));
    }
    isConnecting = false;
    return; // done
  }
  // otherwise we have an error and need to try again
  await delay(CONNECTION_ATTEMPT_PERIOD);
  recursiveAttemptReconnect(dispatch);
};
const attemptReconnect = async dispatch => {
  // top level check
  if (isConnecting) {
    throw new Error('DevErr: by construction, isConnecting should ALWAYS be false when attemptReconnect is called');
  }
  isConnecting = true;
  recursiveAttemptReconnect(dispatch);
};

const actions = {
  setOffline: () => dispatch => {
    dispatch(internalActions.setConnectivityState(CONNECTIVITY_STATES.offline));
    // cancel all and any attemptReconnect until we are back online
    isConnecting = false;
  },
  setOnline: () => async dispatch => {
    dispatch(internalActions.setConnectivityState(CONNECTIVITY_STATES.online));
    // run ONLY when not already running, and do NOT await for the result of attemptReconnect!!!!!
    if (!isConnecting) {
      attemptReconnect(dispatch);
    }
  },
  activate: () => async dispatch => {
    dispatch(internalActions.activateConnectivity());
  },
  deactivate: () => async dispatch => {
    dispatch(internalActions.deactivateConnectivity());
  },
};

const defaultState = {
  connectivityState: CONNECTIVITY_STATES.offline,
  isActive: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case ACTION_TYPES.connectivitySetState: {
      const {connectivityState} = action.payload;
      const next = {
        ...state,
        connectivityState,
      };
      return next;
    }

    case ACTION_TYPES.activateConnectivity: {
      const next = {
        ...state,
        isActive: true,
      };
      return next;
    }

    case ACTION_TYPES.deactivateConnectivity: {
      const next = {
        ...state,
        isActive: false,
      };
      return next;
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
