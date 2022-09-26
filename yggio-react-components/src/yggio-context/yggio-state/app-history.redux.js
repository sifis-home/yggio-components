/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// app-history.redux.js

// modules
// import _ from 'lodash';

const MESSAGE_STACK_DEFAULT_LIMIT = 1;

const ACTION_TYPES = {
  setAppHistoryAddress: 'setAppHistoryAddress',
  removeAppHistoryAddress: 'removeAppHistoryAddress',
};


const actions = {

  setAppHistory: address => dispatch => dispatch({
    type: ACTION_TYPES.setAppHistoryAddress,
    payload: {address},
  }),
  removeAppHistory: () => dispatch => dispatch({
    type: ACTION_TYPES.removeAppHistoryAddress,
  }),

};

const defaultState = {
  address: null,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case ACTION_TYPES.setAppHistoryAddress: {
      const {address} = action.payload;
      const next = {
        ...state,
        address: address || null,
      };
      return next;
    }

    case ACTION_TYPES.removeAppHistoryAddress: {
      const next = {
        ...state,
        address: null,
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
