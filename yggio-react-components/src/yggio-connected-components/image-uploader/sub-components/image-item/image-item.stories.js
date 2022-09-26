/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// image-item.stories.js

import React from 'react';
import {storiesOf} from '@storybook/react';

import {BasicImageItem} from './index';

// lastModified: 1535033906785
// lastModifiedDate: Thu Aug 23 2018 16:18:26 GMT+0200 (Central European Summer Time) {}
// name: "i3_bindings.png"
// path: "i3_bindings.png"
// size: 78176
// type: "image/png"
// webkitRelativePath: ""
// _constructor-name_: "File"

storiesOf('Yggio/Image Uploader/BasicImageItem', module)

  .add('default', () => {
    const props = {
      // from top
      nameSpace: 'blueprints',
      imageItem: {
        file: {
          name: 'MyImage.png',
          size: 1234234
        },
        url: 'https://camo.githubusercontent.com/2f498f158e6853ae709ad687d5fd91dee3610d26/68747470733a2f2f692e6962622e636f2f784a4b357747592f53637265656e73686f742d66726f6d2d323031392d31322d30312d32332d31342d31322e706e67',
      },
      uploadImage: file => console.info('uploadImage', {file}),
      removeImageItem: imageItem => console.info('removeImageItem', {imageItem}),
      // from state
      isEditing: false,
      setEditing: isEditing => console.info('setEditing', {isEditing}),
    };
    return (
      <BasicImageItem {...props} />
    );
  });

// storiesOf('Connected/ImageUploader/Dropzone', module)
//
//   .add('default', () => {
//     // const props = {
//     //   // from top
//     //   onDropAccepted: (files) => console.info('onDropAccepted', {files}),
//     //   onDropRejected: (fileErrors) => console.info('onDropRejected', {fileErrors}),
//     };
//     return (
//       <Dropzone {...props} />
//     );
//   })
