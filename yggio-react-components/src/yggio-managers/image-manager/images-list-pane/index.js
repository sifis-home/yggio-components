/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {compose} from 'lodash/fp';
import {createSelector} from 'reselect';
import {
  withState,
  withReselect,
} from '../../../hocs';
import {
  withYggio,
} from '../../../yggio-context';
import imagesListState from './images-list.state';

import {getConfig} from '../../../yggio-config';

import {
  routingApi,
} from '../../../yggio-routing';
import {
  IMAGE_NAME_SPACES,
} from '../../../constants';

import {
  ImagesListWrapper,
  ItemWrapper,
  DeletionWrapper,
  ThumbImage,
  NameLabel,

} from './styled';

import Button from '../../../components/button';

// /////
// BasicImagesListPane - uses only fully processed data
// /////

const determineSizeStr = (size) => {
  if (!size) {
    return 'UNKNOWN SIZE';
  }
  return `${size.width} X ${size.height} pixels`;
};

const BasicImagesListPane = (props) => (
  <ImagesListWrapper>

    {_.map(props.imageItems, (imageItem) => (
      <React.Fragment key={imageItem.url} >

        {!!props.imageIsDeleting[imageItem.url] && (
          <ImageDeletionConfirmation
            nameSpace={props.nameSpace}
            imageItem={imageItem}
            setImageIsDeleting={props.setImageIsDeleting}
            deleteImage={props.deleteImage}
          />
        )}

        {!props.imageIsDeleting[imageItem.url] && (
          <ImageItem
            nameSpace={props.nameSpace}
            imageItem={imageItem}
            imageSize={props.imageSizes[imageItem.url]}
            setImageSize={props.setImageSize}
            setImageIsDeleting={props.setImageIsDeleting}
          />
        )}

      </React.Fragment>
    ))}
  </ImagesListWrapper>
);


const ImageItem = (props) => (

  <ItemWrapper key={props.imageItem.url} >
    <ThumbImage
      src={props.imageItem.url}
      alt={`uploaded ${props.nameSpace} image ${props.imageItem.name}`}
      onLoad={(evt) => {
        const {target} = evt;
        const size = {
          width: evt.target.naturalWidth,
          height: evt.target.naturalHeight,
        };
        if (!_.isEqual(size, props.imageSize)) {
          props.setImageSize(props.imageItem.url, size);
        }
      }}
    />

    <div style={{display: 'flex', flexDirection: 'column'}}>
      <NameLabel>
        {props.imageItem.name || 'NO NAME'}
      </NameLabel>
      <NameLabel style={{fontSize: '12px'}}>
        {determineSizeStr(props.imageSize)}
      </NameLabel>
    </div>

    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Button
        label={'Delete'}
        style={{
          marginLeft: 5,
          marginBottom: 4,
        }}
        onClick={(evt) => {
          evt.target.blur();
          props.setImageIsDeleting(props.imageItem.url, true);
        }}
      />
      <Button
        label={'Edit'}
        style={{
          marginLeft: 5,
        }}
        onClick={(evt) => {
          evt.target.blur();
        }}
      />
    </div>

  </ItemWrapper>
);

const ImageDeletionConfirmation = (props) => (
  <DeletionWrapper>
    <NameLabel>
      {`Are you sure you want to delete ${props.imageItem.name}?`}
    </NameLabel>
    <Button
      label={'Delete'}
      style={{
        marginLeft: 5,
        marginBottom: 4,
      }}
      onClick={async (evt) => {
        evt.target.blur();
        try {
          await props.deleteImage({
            image: props.imageItem.image,
            nameSpace: props.nameSpace,
          });
        } catch (err) {
          // do  nothing?
        }
        props.setImageIsDeleting(props.imageItem.url, false);
      }}
    />
    <Button
      label={'Cancel'}
      style={{
        marginLeft: 5,
      }}
      onClick={(evt) => {
        evt.target.blur();
        props.setImageIsDeleting(props.imageItem.url, false);
      }}
    />
  </DeletionWrapper>
);

BasicImagesListPane.propTypes = {
  // from top
  nameSpace: PropTypes.oneOf([undefined, ..._.values(IMAGE_NAME_SPACES)]),
  // from yggio & reselect
  deleteImage: PropTypes.func.isRequired,
  imageItems: PropTypes.array.isRequired,
  // from state
  imageSizes: PropTypes.object.isRequired,
  imageIsDeleting: PropTypes.object.isRequired,
  setImageSize: PropTypes.func.isRequired,
  setImageIsDeleting: PropTypes.func.isRequired,
};


// /////
// Data processing layers
// /////

const imagesSelector = createSelector(
  props => props.nameSpace,
  props => props.imageNameSpaces,
  (nameSpace, imageNameSpaces) => {
    const images = imageNameSpaces[nameSpace] || [];
    return images;
  },
);

const timestampMatcher = RegExp('-[0-9]+.', 'i');
const imageItemsSelector = createSelector(
  imagesSelector,
  images => {
    const imageItems = _.map(images, image => {
      const item = {
        image,
        url: `${getConfig().baseRequestUrl}/${image}`,
        name: image.split(timestampMatcher).shift().split('/').pop(),
      };
      return item;
    });
    return imageItems;
  },
);

const reselectors = {
  imageItems: imageItemsSelector,
};

const RawImagesListPane = compose(
  withReselect(reselectors),
  withState(imagesListState),
)(BasicImagesListPane);

RawImagesListPane.propTypes = {
  // from top
  nameSpace: PropTypes.oneOf([undefined, ..._.values(IMAGE_NAME_SPACES)]),
  // from yggio
  imageNameSpaces: PropTypes.object.isRequired,
  deleteImage: PropTypes.func.isRequired,
};

// /////
// The ImagesListPane that is exposed
// /////

// the yggio data hookup
const yggio = {
  mapYggioStateToProps: (yggioState) => ({
    imageNameSpaces: yggioState.database.images,
  }),
  mapYggioActionsToProps: (yggioActions) => ({
    deleteImage: yggioActions.database.images.deleteImage,
  }),
};


const ImagesListPane = compose(
  withYggio(yggio),
)(RawImagesListPane);

ImagesListPane.propTypes = {
  // from top
  nameSpace: PropTypes.oneOf([undefined, ..._.values(IMAGE_NAME_SPACES)]),
};

// /////
// exports
// /////

export default ImagesListPane;
export {
  BasicImagesListPane,
  RawImagesListPane,
};
