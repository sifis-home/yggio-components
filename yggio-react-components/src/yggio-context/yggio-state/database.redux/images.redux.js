/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// images.redux.js

import _ from 'lodash';
import {actions as apiActions} from '../api-state.redux';

const ACTION_TYPES = {
  dbImagesReplaceNameSpace: 'dbImagesReplaceNameSpace',
  dbImagesAppendToNameSpace: 'dbImagesAppendToNameSpace',
  dbImagesRemoveNameSpace: 'dbImagesRemoveNameSpace',
  dbImagesDeleteImage: 'dbImagesDeleteImage',
};


const internalActions = {
  replaceNameSpace: (nameSpace, images) => ({
    type: ACTION_TYPES.dbImagesReplaceNameSpace,
    payload: {nameSpace, images},
  }),
  appendToNameSpace: (nameSpace, images) => ({
    type: ACTION_TYPES.dbImagesAppendToNameSpace,
    payload: {nameSpace, images},
  }),
  removeNameSpace: nameSpace => ({
    type: ACTION_TYPES.dbImagesRemoveNameSpace,
    payload: {nameSpace},
  }),
  deleteImage: (nameSpace, image) => ({
    type: ACTION_TYPES.dbImagesDeleteImage,
    payload: {nameSpace, image},
  }),
};

const actions = {
  getImages: ({nameSpace}) => async dispatch => {
    const getImagesAction = apiActions.images.getImages({nameSpace});
    const images = await dispatch(getImagesAction);
    dispatch(internalActions.replaceNameSpace(nameSpace, images));
  },
  uploadImage: ({file, nameSpace}) => async dispatch => {
    const uploadImageAction = apiActions.images.uploadImage({file, nameSpace});
    const image = await dispatch(uploadImageAction);
    dispatch(internalActions.appendToNameSpace(nameSpace, [image]));
  },
  deleteImage: ({image, nameSpace}) => async dispatch => {
    const deleteImageAction = apiActions.images.deleteImage({image, nameSpace});
    await dispatch(deleteImageAction);
    dispatch(internalActions.deleteImage(nameSpace, image));
  },
  editImage: ({oldImageName, newImageName, nameSpace}) => async dispatch => {
    const editImageAction = apiActions.images.editImage({oldImageName, newImageName, nameSpace});
    await dispatch(editImageAction);
    // NOTE: not entirely sure what should happen here (depends on what type of string image is)
    dispatch(internalActions.deleteImage(nameSpace, oldImageName));
    dispatch(internalActions.appendToNameSpace(nameSpace, [newImageName]));
  },

};

const defaultState = {};

const reducer = (state = defaultState, action) => {

  switch (action.type) {

    case ACTION_TYPES.dbImagesReplaceNameSpace: {
      const {nameSpace, images} = action.payload;
      const nextState = {
        ...state,
        [nameSpace]: _.sortBy(images),
      };
      return nextState;
    }

    case ACTION_TYPES.dbImagesAppendToNameSpace: {
      const {nameSpace, images} = action.payload;
      const oldImages = _.get(state, nameSpace, []);
      const allImages = _.uniq(_.concat(oldImages, images));
      const nextState = {
        ...state,
        [nameSpace]: _.sortBy(allImages),
      };
      return nextState;
    }

    case ACTION_TYPES.dbImagesRemoveNameSpace: {
      const {nameSpace} = action.payload;
      return _.omit(state, nameSpace);
    }

    case ACTION_TYPES.dbImagesDeleteImage: {
      const {nameSpace, image} = action.payload;
      const oldImages = _.get(state, nameSpace, []);
      const updatedImages = _.without(oldImages, image);
      const nextState = {
        ...state,
        [nameSpace]: _.sortBy(updatedImages),
      };
      return nextState;
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
