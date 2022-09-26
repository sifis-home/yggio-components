/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// message-stack.redux.js

// modules
// import _ from 'lodash';

const MESSAGE_STACK_DEFAULT_LIMIT = 10;

const ACTION_TYPES = {
  // more needs to happen here
  messageStackStackLimit: 'messageStackStackLimit',
  messageStackPushMessage: 'messageStackPushMessage',
  messageStackWipeMessages: 'messageStackWipeMessages',
};


const actions = {

  setMessageStackLimit: limit => dispatch => dispatch({
    type: ACTION_TYPES.messageStackStackLimit,
    payload: {limit},
  }),

  pushMessage: messageItem => dispatch => dispatch({
    type: ACTION_TYPES.messageStackPushMessage,
    payload: {messageItem},
  }),

  wipeMessages: () => dispatch => dispatch({
    type: ACTION_TYPES.messageStackWipeMessages,
  }),

};

const defaultState = {
  limit: MESSAGE_STACK_DEFAULT_LIMIT,
  messageItems: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case ACTION_TYPES.messageStackStackLimit: {
      const {limit} = action.payload;
      const next = {
        ...state,
        limit,
      };
      return next;
    }

    case ACTION_TYPES.messageStackPushMessage: {
      const {messageItem} = action.payload;
      // take care of message limit violations
      const {limit} = state;
      const currNum = state.messageItems.length + 1;
      const excess = Math.max(0, limit - currNum);
      const nextMessageItems = state.messageItems.slice(excess);
      nextMessageItems.push(messageItem);
      // and the state
      const next = {
        ...state,
        messageItems: nextMessageItems,
      };
      return next;
    }

    case ACTION_TYPES.messageStackWipeMessages: {
      const next = {
        ...state,
        messageItems: [],
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
