/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// device-total-count.redux.js

const ACTION_TYPES = {
  setDeviceTotalCount: 'setDeviceTotalCount',
};

const actions = {
  setDeviceTotalCount: deviceTotalCount => ({
    type: ACTION_TYPES.setDeviceTotalCount,
    payload: {deviceTotalCount},
  }),
};

const defaultState = null;

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TYPES.setDeviceTotalCount: {
      const {deviceTotalCount} = action.payload;
      return deviceTotalCount || null;
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
