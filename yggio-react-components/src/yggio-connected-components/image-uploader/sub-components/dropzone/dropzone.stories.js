/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// dropzone.stories.js

import React from 'react';
import {storiesOf} from '@storybook/react';

import Dropzone, {BasicDropzone} from './index';

storiesOf('Yggio/Image Uploader/Basic Dropzone', module)

  .add('default', () => {
    const props = {
      // from top
      onDropAccepted: files => console.info('onDropAccepted', {files}),
      onDropRejected: fileErrors => console.info('onDropRejected', {fileErrors}),
      // from state
      isDragging: false,
      setDragging: isDragging => console.info('setDragging', {isDragging}),
    };
    return (
      <BasicDropzone {...props} />
    );
  });

storiesOf('Yggio/Image Uploader/Dropzone', module)

  .add('default', () => {
    const props = {
      // from top
      onDropAccepted: files => console.info('onDropAccepted', {files}),
      onDropRejected: fileErrors => console.info('onDropRejected', {fileErrors}),
    };
    return (
      <Dropzone {...props} />
    );
  });
