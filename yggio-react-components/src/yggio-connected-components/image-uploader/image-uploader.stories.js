/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// image-uploader.stories.js

import React from 'react';
import {storiesOf} from '@storybook/react';

import ImageUploader, {BasicImageUploader} from './index';

storiesOf('Yggio/Image Uploader/Basic Image Uploader', module)

  .add('default', () => {
    const props = {
      // from top
      nameSpace: 'blueprints',
      // from yggio
      uploadImage: image => console.info('uploadImage', {image}),
      // from state
      imageItems: [],
      errorItems: [],
      addImageFiles: files => console.info('addImageFiles', {files}),
      addFileErrors: errors => console.info('addFileErrors', {errors}),
      removeImageItem: imageItem => console.info('removeImageItem', {imageItem}),
    };
    return (
      <BasicImageUploader {...props} />
    );
  });

storiesOf('Yggio/Image Uploader/Main Export', module)

  .add('default', () => {
    const props = {
      // from top
      nameSpace: 'blueprints',
      // from yggio
      uploadImage: image => console.info('uploadImage', {image}),
    };
    return (
      <ImageUploader {...props} />
    );
  });
