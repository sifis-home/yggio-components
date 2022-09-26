/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// images.js

import request from '../http-request';

import {
  REQUEST_METHODS,
  RESOURCE_TYPES,
} from '../../../constants';


// ////
// image handling
// ////

const getImages = token => ({nameSpace}) => request({
  token,
  method: REQUEST_METHODS.get,
  URI: `${RESOURCE_TYPES.images}/${nameSpace}`,
});

const uploadImage = token => ({file, nameSpace}) => {
  const files = new FormData();
  files.append('image', file, file.name);
  return request({
    token,
    method: REQUEST_METHODS.post,
    URI: `${RESOURCE_TYPES.images}/${nameSpace}`,
    data: files,
  });
};

const editImage = token => ({oldImageName, newImageName, namespace}) => request({
  token,
  method: REQUEST_METHODS.put,
  URI: `${RESOURCE_TYPES.images}/${namespace}`,
  data: {oldImageName, newImageName},
});

const deleteImage = token => ({image, nameSpace}) => request({
  token,
  method: REQUEST_METHODS.delete,
  URI: `${RESOURCE_TYPES.images}/${nameSpace}`,
  data: {image},
});


// ////
//  exports
// ////

export {
  getImages,
  uploadImage,
  deleteImage,
  editImage,
};
