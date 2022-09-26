/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// image-uploader/index.ts

import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {compose} from 'lodash/fp';

import {withYggio} from '../../yggio-context';
import {withState} from '../../hocs';
import state from './state';

import {IMAGE_NAME_SPACES} from '../../constants';

import {
  Dropzone,
  ImageItem,
} from './sub-components';

import {FlexColMaxWidthWrapper} from '../../global/styled';
import {ImageUploaderWrapper} from './styled';


// ////
// BasicImageUploader
// ////

const BasicImageUploader = props => {
  // console.log('BasicImageUploader', {props});
  return (
    <ImageUploaderWrapper>

      <FlexColMaxWidthWrapper>
        <Dropzone
          onDropAccepted={props.addImageFiles}
          onDropRejected={props.addFileErrors}
        />
      </FlexColMaxWidthWrapper>

      <div style={{
        display: 'flex',
        width: '100%',
      }}
      >
        {_.map(props.imageItems, imageItem => {
          return (
            <ImageItem
              key={imageItem.url || imageItem.file.name}
              nameSpace={props.nameSpace}
              imageItem={imageItem}
              removeImageItem={props.removeImageItem}
              uploadImage={props.uploadImage}
            />
          );
        })}
      </div>

    </ImageUploaderWrapper>
  );
};


BasicImageUploader.propTypes = {
  // from top
  nameSpace: PropTypes.oneOf(_.values(IMAGE_NAME_SPACES)).isRequired,
  // from yggio
  uploadImage: PropTypes.func.isRequired,
  // from state
  imageItems: PropTypes.array.isRequired,
  errorItems: PropTypes.array.isRequired,
  addImageFiles: PropTypes.func.isRequired,
  addFileErrors: PropTypes.func.isRequired,
  removeImageItem: PropTypes.func.isRequired,
};


// ////
// RawImageUploader - state & processing
// ////

const RawImageUploader = compose(
  withState(state),
)(BasicImageUploader);

RawImageUploader.propTypes = {
  // from top
  nameSpace: PropTypes.oneOf(_.values(IMAGE_NAME_SPACES)).isRequired,
  // from yggio
  uploadImage: PropTypes.func.isRequired,
};


// ////
// ImageUploader - fully yggio connected
// ////

const yggio = {
  mapYggioActionsToProps: yggioActions => ({
    uploadImage: yggioActions.database.images.uploadImage,
  }),
};

const ImageUploader = compose(
  withYggio(yggio),
)(RawImageUploader);

ImageUploader.propTypes = {
  // from top
  nameSpace: PropTypes.oneOf(_.values(IMAGE_NAME_SPACES)).isRequired,
};

// ////
// exports
// ////

export default ImageUploader;
export {
  BasicImageUploader,
};
