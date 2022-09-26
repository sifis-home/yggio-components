/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// dropzone/state.js


const ACTION_TYPES = {
  imageItemSetEditing: 'imageItemSetEditing',
};

const actions = {
  setEditing: isEditing => ({
    type: ACTION_TYPES.imageItemSetEditing,
    payload: {isEditing},
  })
};

const defaultState = {
  isEditing: false,
};

const reducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {

    case ACTION_TYPES.imageItemSetEditing: {
      const {isEditing} = payload;
      const nextState = {
        ...state,
        isEditing,
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
