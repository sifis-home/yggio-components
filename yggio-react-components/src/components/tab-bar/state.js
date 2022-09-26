/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// NOTE: This state is only intended to be used by story.

const ACTION_TYPES = {
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
};

const actions = {
  setActiveTab: activeTab => ({
    type: ACTION_TYPES.SET_ACTIVE_TAB,
    payload: {activeTab},
  }),
};


const defaultState = {
  activeTab: null,
};

const reducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {

    case ACTION_TYPES.SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: payload.activeTab,
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
