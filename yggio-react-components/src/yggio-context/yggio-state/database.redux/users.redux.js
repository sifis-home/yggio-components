/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// users.redux.js

import _ from 'lodash';
import {actions as apiActions} from '../api-state.redux';


const ACTION_TYPES = {
  dbUsersRemoveAll: 'dbUsersRemoveAll',
  dbUsersReplaceMany: 'dbUsersReplaceMany',
  dbUsersReplaceOne: 'dbUsersReplaceOne',
};


const internalActions = {
  removeAllUsers: () => ({
    type: ACTION_TYPES.dbUsersRemoveAll,
  }),
  replaceUsers: users => ({
    type: ACTION_TYPES.dbUsersReplaceMany,
    payload: {users},
  }),
  replaceUser: user => ({
    type: ACTION_TYPES.dbUsersReplaceOne,
    payload: {user},
  }),
};

// only the internalActions are used so far (by organizations.redux)
const actions = {
  fetchUsers: () => async dispatch => {
    const fetchUsersAction = apiActions.users.fetch();
    const users = await dispatch(fetchUsersAction);
    dispatch(internalActions.replaceUsers(users));
  },
  resetUsers: () => async dispatch => {
    dispatch(internalActions.removeAllUsers());
  }
};

const defaultState = {};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case ACTION_TYPES.dbUsersRemoveAll: {
      return defaultState;
    }

    case ACTION_TYPES.dbUsersReplaceMany: {
      const {users} = action.payload;
      const replacements = {};
      _.each(users, user => {
        replacements[user._id] = user;
      });
      return {
        ...state,
        ...replacements,
      };
    }

    case ACTION_TYPES.dbUsersReplaceOne: {
      const {user} = action.payload;
      return {
        ...state,
        [user._id]: user,
      };
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
