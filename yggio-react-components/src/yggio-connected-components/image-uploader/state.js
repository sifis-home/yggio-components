/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// image-uploader/state.js

import _ from 'lodash';

const ACTION_TYPES = {
  imageItemsAdd: 'imageItemsAdd',
  imageItemRemove: 'imageItemRemove',
  imageErrorsAdd: 'imageErrorsAdd',
  imageErrorsRemove: 'imageErrorsRemove',
  // imageSelect: 'imageSelect',
  // imageReset: 'imageReset',
  // imagePreview: 'imagePreview',
  // imageSetUploading: 'imageSetUploading',
  // imageSetName: 'imageSetName',
};


const internalActions = {

  addImageItems: imageItems => ({
    type: ACTION_TYPES.imageItemsAdd,
    payload: {imageItems},
  }),

  removeImageItem: imageItem => ({
    type: ACTION_TYPES.imageItemRemove,
    payload: {imageItem},
  }),

  addErrorItems: errorItems => ({
    type: ACTION_TYPES.imageErrorsAdd,
    payload: {errorItems},
  }),

  removeErrorItems: numErrorItems => ({
    type: ACTION_TYPES.imageErrorsRemove,
    payload: {numErrorItems},
  }),

};

const actions = {

  addImageFiles: files => dispatch => {
    const imageItems = _.map(files, file => {
      const imageItem = {
        file,
        // URL is part official WebAPI specification
        url: URL.createObjectURL(file),
      };
      return imageItem;
    });
    dispatch(internalActions.addImageItems(imageItems));
  },

  removeImageItem: internalActions.removeImageItem,

  addFileErrors: fileErrors => dispatch => {
    const errorItems = _.map(fileErrors, fileError => {
      return _.get(fileError, 'message', 'No message found');
    });
    dispatch(internalActions.addErrorItems(errorItems));
    setTimeout(() => {
      dispatch(internalActions.removeErrorItems(errorItems.length));
    }, 2000);
  },

};


// const dummyImageItem = {
//   file: {
//     lastModified: 1604841409927,
//     lastModifiedDate: new Date('Sun Nov 08 2020 14:16:49 GMT+0100'),
//     name: "apple.png",
//     path: "apple.png",
//     size: 5129,
//     type: "image/png",
//     webkitRelativePath: "",
//   },
//   url: "blob:http://localhost:3001/b52344ba-de2c-48f5-ba08-06b9515f6290",
// };

const defaultState = {
  imageItems: [],
  errorItems: [],
};

const reducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {

    case ACTION_TYPES.imageItemsAdd: {
      const {imageItems} = payload;
      const nextState = {
        ...state,
        imageItems: _.concat(state.imageItems, imageItems),
      };
      return nextState;
    }

    case ACTION_TYPES.imageItemRemove: {
      const {imageItem} = payload;
      const nextState = {
        ...state,
        imageItems: _.without(state.imageItems, imageItem),
      };
      return nextState;
    }

    case ACTION_TYPES.imageErrorsAdd: {
      const {errorItems} = payload;
      const nextState = {
        ...state,
        errorItems: _.concat(state.errorItems, errorItems),
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
