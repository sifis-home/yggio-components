/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
const ACTION_TYPES = {
  openStatusModal: 'openStatusModal',
  closeStatusModal: 'closeStatusModal',
};

const actions = {
  openStatusModal: deviceId => ({
    type: ACTION_TYPES.openStatusModal,
    payload: {deviceId},
  }),
  closeStatusModal: () => ({
    type: ACTION_TYPES.closeStatusModal,
  }),
};

const defaultState = {
  deviceWithOpenStatusModal: null,
};

const reducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {

    case ACTION_TYPES.openStatusModal: {
      const {deviceId} = payload;
      return {
        ...state,
        deviceWithOpenStatusModal: deviceId,
      };
    }

    case ACTION_TYPES.closeStatusModal: {
      return {
        ...state,
        deviceWithOpenStatusModal: null,
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
