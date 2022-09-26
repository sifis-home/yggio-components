/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// dropzone/state.js


const ACTION_TYPES = {
  dropzoneSetDragging: 'dropzoneSetDragging',
};

const actions = {
  setDragging: isDragging => ({
    type: ACTION_TYPES.dropzoneSetDragging,
    payload: {isDragging},
  })
};

const defaultState = {
  isDragging: false,
};

const reducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {

    case ACTION_TYPES.dropzoneSetDragging: {
      const {isDragging} = payload;
      const nextState = {
        ...state,
        isDragging,
      };
      return nextState;
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
