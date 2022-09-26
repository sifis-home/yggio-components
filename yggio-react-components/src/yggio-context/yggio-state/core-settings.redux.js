/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// core-settings.redux.js

// modules
// import _ from 'lodash';

import {getSocket} from '../network/socketio';

const ACTION_TYPES = {
  // more needs to happen here
  coreSettingsStartSocket: 'coreSettingsStartSocket',
  coreSettingsStopSocket: 'coreSettingsStopSocket',
};

const internalActions = {
  startSocket: () => ({
    type: ACTION_TYPES.coreSettingsStartSocket,
  }),
  stopSocket: () => ({
    type: ACTION_TYPES.coreSettingsStopSocket,
  }),
};

// this is DELIBERATELY being kept out of the state
// and is ONLY modified by actions, NOT internalActions
let socketConnection = null;

const actions = {

  openSocket: () => dispatch => {
    if (socketConnection) {
      return;
    }
    // add listeners?
    socketConnection = getSocket();
    dispatch(internalActions.startSocket());
  },
  closeSocket: () => dispatch => {
    // remove listeners?
    socketConnection.close();
    socketConnection = null;
    dispatch(internalActions.stopSocket());
  },
};

const defaultState = {
  useSocket: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.coreSettingsStartSocket: {
      const next = {
        ...state,
        useSocket: true,
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
