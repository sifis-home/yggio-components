/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
const ACTION_TYPES = {
  setPage: 'setPage',
};

const actions = {
  setPage: page => ({
    type: ACTION_TYPES.setPage,
    payload: {page},
  }),
};

const defaultState = {
  page: 'default',
};

const reducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {

    case ACTION_TYPES.setPage: {
      const {page} = payload;
      return {
        ...state,
        page,
      };
    }

    default: {
      return state;
    }

  }
};

export default {
  actions,
  reducer,
};
