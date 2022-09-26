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
import {memoizedInputsChecker} from '../../../utils';
import {
  withEffect,
  withReselect,
} from '../../../hocs';
import {withYggio} from '../../../yggio-context';

import {
  IMAGE_NAME_SPACES,
} from '../../../constants';

import Select from '../../../components/select';
import {Link} from '../../../components/yggio-links';

import {
  OptionsBarWrapper,
} from './styled';


// /////
// The BasicNameSpaceOptionsBar - uses only fully processed data
// /////

const BasicNameSpaceOptionsBar = (props) => {
  // console.log('BasicNameSpaceOptionsBar', {props});
  return (
    <OptionsBarWrapper>
      <Select
        width={'300px'}
        label={'Select image name-space'}
        options={_.map(IMAGE_NAME_SPACES, (nameSpace) => ({
          label: nameSpace,
          value: nameSpace,
        }))}
        value={props.nameSpace}
        onChange={(evt) => {
          const nameSpace = evt.target.value || props.nameSpace;
          props.setNameSpace.action({nameSpace})();
        }}
      />
      {!!props.isUpload && (
        <Link
          label={'Cancel'}
          link={props.onCancelUpload.action({nameSpace: props.nameSpace})}
          style={{marginLeft: 10, marginTop: 20, width: 200}}
        />
      )}
      {!props.isUpload && (
        <Link
          label={'Upload images'}
          link={props.onUpload.action({nameSpace: props.nameSpace})}
          style={{marginLeft: 10, marginTop: 20, width: 200}}
        />
      )}
    </OptionsBarWrapper>
  );
}
BasicNameSpaceOptionsBar.propTypes = {
  // from top
  nameSpace: PropTypes.oneOf([undefined, ..._.values(IMAGE_NAME_SPACES)]),
  isUpload: PropTypes.bool,
  // from yggio & reselect
  images: PropTypes.array.isRequired,
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

const reselectors = {
  images: imagesSelector,
};


const isSameNameSpace = memoizedInputsChecker();
const refreshNameSpaceEffect = async (props) => {
  const needsUpdate = props.nameSpace && !isSameNameSpace(props.nameSpace);
  if (needsUpdate) {
    try {
      await props.getImages({nameSpace: props.nameSpace});
    } catch (err) {
      // do nothing?
    }
  }
};


const RawNameSpaceOptionsBar = compose(
  withReselect(reselectors),
  withEffect(refreshNameSpaceEffect),
)(BasicNameSpaceOptionsBar);

RawNameSpaceOptionsBar.propTypes = {
  // from top
  nameSpace: PropTypes.oneOf([undefined, ..._.values(IMAGE_NAME_SPACES)]),
  isUpload: PropTypes.bool,
  // from yggio
  imageNameSpaces: PropTypes.object.isRequired,
  getImages: PropTypes.func.isRequired,
};


// /////
// The NameSpaceOptionsBar that is exposed
// /////

// the yggio data hookup
const yggio = {
  mapYggioStateToProps: (yggioState) => ({
    imageNameSpaces: yggioState.database.images,
  }),
  mapYggioActionsToProps: (yggioActions) => ({
    getImages: yggioActions.database.images.getImages,
  }),
};

const NameSpaceOptionsBar = compose(
  withYggio(yggio),
)(RawNameSpaceOptionsBar);

NameSpaceOptionsBar.propTypes = {
  // from top
  nameSpace: PropTypes.oneOf([undefined, ..._.values(IMAGE_NAME_SPACES)]),
  isUpload: PropTypes.bool,
};

// /////
// exports
// /////

export default NameSpaceOptionsBar;
export {
  BasicNameSpaceOptionsBar,
  RawNameSpaceOptionsBar,
};
