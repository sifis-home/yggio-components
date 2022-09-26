/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
const ACTION_TYPES = {
  open: 'open',
  close: 'close',
};

const defaultState = {
  isOpen: false,
};

const actions = {
  open: () => ({
    type: ACTION_TYPES.open,
  }),
  close: () => ({
    type: ACTION_TYPES.close,
  }),
};

const reducer = (state = defaultState, action) => {
  const {type} = action;
  switch (type) {

    case ACTION_TYPES.open: {
      return {
        isOpen: true,
      };
    }
    case ACTION_TYPES.close: {
      return {
        isOpen: false,
      };
    }

    default: {
      return state;
    }

  }
};

export default {
  reducer,
  actions,
};
