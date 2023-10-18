/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import PropTypes from 'prop-types';

import {Container, Icon} from './styled';
import sortNoneImage from '../../assets/images/sort-none.svg';
import sortAscImage from '../../assets/images/sort-up.svg';
import sortDescImage from '../../assets/images/sort-down.svg';

const getImage = props => {
  if (props.order === 'asc') {
    return sortAscImage;
  } if (props.order === 'desc') {
    return sortDescImage;
  }
  return sortNoneImage;

};

const SortButton = props => (
  <Container
    onClick={props.onClick}
    margin={props.margin}
  >
    <Icon src={getImage(props)} />
  </Container>
);

SortButton.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']),
  onClick: PropTypes.func,
  margin: PropTypes.string,
};

export default SortButton;
