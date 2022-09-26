/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// image-list.state.js


const ACTION_TYPES = {
  setImageSize: 'setImageSize',
  setImageIsDeleting: 'setImageIsDeleting',
};

const actions = {
  setImageSize: (url, size) => ({
    type: ACTION_TYPES.setImageSize,
    payload: {url, size},
  }),
  setImageIsDeleting: (url, imageIsDeleting) => ({
    type: ACTION_TYPES.setImageIsDeleting,
    payload: {url, imageIsDeleting},
  }),
};

const defaultState = {
  imageSizes: {},
  imageIsDeleting: {},
};

const reducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {

    case ACTION_TYPES.setImageSize: {
      const {url, size} = payload;
      const nextState = {
        ...state,
        imageSizes: {
          ...state.imageSizes,
          [url]: size,
        },
      };
      return nextState;
    }

    case ACTION_TYPES.setImageIsDeleting: {
      const {url, imageIsDeleting} = payload;
      const nextState = {
        ...state,
        imageIsDeleting: {
          ...state.imageIsDeleting,
          [url]: imageIsDeleting,
        },
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
