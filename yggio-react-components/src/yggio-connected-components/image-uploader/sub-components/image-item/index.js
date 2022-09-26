/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// image-item/index.ts

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'lodash/fp';

import {withState} from '../../../../hocs';
import state from './state';

import {IMAGE_NAME_SPACES} from '../../../../constants';
import Button from '../../../../components/button';

import {
  ItemWrapper,
  ThumbImage,
  NameLabel,
} from './styled';

// ////
// utils & constants
// ////

const fileShape = PropTypes.shape({
  type: PropTypes.string,
  name: PropTypes.string,
  lastModified: PropTypes.number,
  size: PropTypes.number,
});

// ////
// main component
// ////

const BasicImageItem = props => (
  <ItemWrapper>
    <ThumbImage
      img={props.imageItem.url}
      src={props.imageItem.url}
      alt={`upload image item ${props.imageItem.file.name}`}
    />

    <div style={{display: 'flex', flexDirection: 'column', marginLeft: 10}}>
      <NameLabel>
        {props.imageItem.file.name}
      </NameLabel>
      <NameLabel style={{fontSize: '12px'}}>
        {`${props.imageItem.file.size} bytes`}
      </NameLabel>
    </div>

    <div style={{display: 'flex', flexDirection: 'column', marginLeft: 10}}>
      <Button
        label={'Upload'}
        style={{
          marginBottom: 4,
        }}
        onClick={async () => {
          try {
            await props.uploadImage({
              nameSpace: props.nameSpace,
              file: props.imageItem.file,
            });
          } catch (err) {
            // toaster should already have been done
            // not sure if additional stuff is needed here
          }
          props.removeImageItem(props.imageItem);
        }}
      />
      <Button
        label={'Remove'}
        onClick={() => props.removeImageItem(props.imageItem)}
      />
    </div>

  </ItemWrapper>
);


BasicImageItem.propTypes = {
  // from top
  nameSpace: PropTypes.oneOf(_.values(IMAGE_NAME_SPACES)).isRequired,
  imageItem: PropTypes.shape({
    file: fileShape,
    url: PropTypes.string,
    // customName: PropTypes.string,
  }).isRequired,
  uploadImage: PropTypes.func.isRequired,
  removeImageItem: PropTypes.func.isRequired,
  // setCustomName: PropTypes.func.isRequired,
  // from state
  isEditing: PropTypes.bool.isRequired,
  setEditing: PropTypes.func.isRequired,
};

// ////
// some tiny local state (keep track of dragging for css)
// ////

const ImageItem = compose(
  withState(state),
)(BasicImageItem);


ImageItem.propTypes = {
  // from top
  nameSpace: PropTypes.oneOf(_.values(IMAGE_NAME_SPACES)).isRequired,
  imageItem: PropTypes.shape({
    file: fileShape,
    url: PropTypes.string,
    // customName: PropTypes.string,
  }).isRequired,
  uploadImage: PropTypes.func.isRequired,
  removeImageItem: PropTypes.func.isRequired,
  // setCustomName: PropTypes.func.isRequired,
};

// ////
// exports
// ////

export default ImageItem;
export {
  BasicImageItem,
};
