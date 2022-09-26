/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// device-commands.redux.js

import _ from 'lodash';
import {actions as apiActions} from '../api-state.redux';

const ACTION_TYPES = {
  dbDeviceCommandsReplaceOne: 'dbDeviceCommandsReplaceOne',
  dbDeviceCommandsRemoveOne: 'dbDeviceCommandsRemoveOne',
  dbDeviceCommandsReplaceMany: 'dbDeviceCommandsReplaceMany',
};

const internalActions = {
  replaceDeviceCommand: ({command, deviceId}) => ({
    type: ACTION_TYPES.dbDeviceCommandsReplaceOne,
    payload: {command, deviceId},
  }),
  removeDeviceCommand: deviceId => ({
    type: ACTION_TYPES.dbDeviceCommandsRemoveOne,
    payload: {deviceId},
  }),
  replaceDeviceCommands: deviceCommands => ({
    type: ACTION_TYPES.dbDeviceCommandsReplaceMany,
    payload: {deviceCommands},
  }),
};

const actions = {
  sendCommand: ({command, data, deviceId}) => async dispatch => {
    const sendCommandAction = apiActions.devices.sendCommand({command, data});
    const commandResponse = await dispatch(sendCommandAction);
    dispatch(internalActions.replaceDeviceCommand({command: commandResponse, deviceId}));
  },
  deleteCommand: deviceId => async dispatch => {
    dispatch(internalActions.removeDeviceCommand(deviceId));
  },
};

const defaultState = {};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.dbDeviceCommandsReplaceOne: {
      const {command, deviceId} = action.payload;
      return {...state, [deviceId]: command};
    }

    case ACTION_TYPES.dbDeviceCommandsRemoveOne: {
      const {deviceId} = action.payload;
      return _.omit(state, deviceId);
    }

    default: {
      return state;
    }
  }
};

export {
  internalActions,
  actions,
  reducer,
};
