/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// subcomponents.js

import React from 'react';
import PropTypes from 'prop-types';

import {
  ContenderContainer,
} from './styled';

import Button from '../../../../../components/button';

const ContenderRow = props => {

  const onClick = () => {
    props.onSelected(props.contender._id);
  };

  return (
    <ContenderContainer>
      <p>{props.contender.username}</p>
      <Button
        onClick={onClick}
        content={'Add'}
        color="green"
      />
    </ContenderContainer>
  );
};
ContenderRow.propTypes = {
  contender: PropTypes.object,
  onSelected: PropTypes.func,
};


export {
  ContenderRow,
};
