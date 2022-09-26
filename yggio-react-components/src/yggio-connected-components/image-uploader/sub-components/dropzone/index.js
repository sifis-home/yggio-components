/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {compose, includes} from 'lodash/fp';


import ReactDropzone from 'react-dropzone';
import {Icon} from 'react-icons-kit';
import {cloudUpload} from 'react-icons-kit/fa/cloudUpload';
import state from './state';
import {withState} from '../../../../hocs';

import {DropzoneDecorations} from './styled';
import {IMAGES} from '../../../../constants';

// ////
// local utils
// ////
/* eslint-disable no-unused-vars */
const determineFileErrorMessage = file => {
  if (file.size > IMAGES.maxSize) {
    return 'File size too large (MAX: 2MB)';
  }
  if (!includes(file.type, IMAGES.allowedTypes)) {
    return 'File type not supported';
  }
  return 'Unknown error';
};
/* eslint-enable no-unused-vars */

// ////
// main component
// ////

const BasicDropzone = props => (
  <ReactDropzone
    accept={IMAGES.allowedTypes}
    maxSize={IMAGES.maxSize}
    onDragEnter={() => {
      props.setDragging(true);
    }}
    onDragLeave={() => {
      props.setDragging(false);
    }}
    onDropAccepted={files => {
      props.onDropAccepted(files);
      props.setDragging(false);
    }}
    onDropRejected={fileErrors => {
      props.onDropRejected(fileErrors);
      props.setDragging(false);
    }}
  >
    {({getRootProps, getInputProps}) => (
      <DropzoneDecorations
        isDragging={props.isDragging}
        width={props.width}
        heigth={props.height}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Icon
          icon={cloudUpload}
          size={80}
        />
        <p>
          {'Drag & drop your files here, or click to select files.'}
        </p>
      </DropzoneDecorations>
    )}
  </ReactDropzone>
);

BasicDropzone.propTypes = {
  // from top
  width: PropTypes.string,
  height: PropTypes.string,
  onDropAccepted: PropTypes.func.isRequired,
  onDropRejected: PropTypes.func.isRequired,
  // from state
  isDragging: PropTypes.bool.isRequired,
  setDragging: PropTypes.func.isRequired,
};

// ////
// some tiny local state (keep track of dragging for css)
// ////

const Dropzone = compose(
  withState(state),
)(BasicDropzone);


Dropzone.propTypes = {
  // from top
  width: PropTypes.string,
  height: PropTypes.string,
  onDropAccepted: PropTypes.func.isRequired,
  onDropRejected: PropTypes.func.isRequired,
};

// ////
// exports
// ////

export default Dropzone;
export {
  BasicDropzone,
};
