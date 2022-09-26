/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'react-icons-kit';
import {close as removeIcon} from 'react-icons-kit/ionicons/close';

import {
  Container,
  Text,
  RemoveButtonOuter,
  RemoveButtonInner,
  IconContainer,
} from './styled';

const Chip = props => {
  return (
    <Container
      showRemoveButton={props.showRemoveButton}
      color={props.color}
      ghosted={props.ghosted}
      margin={props.margin}
    >
      <Text>
        {props.text}
      </Text>
      {props.showRemoveButton &&
        <RemoveButtonOuter
          onClick={props.onRemoveClick}
        >
          <RemoveButtonInner
            color={props.color}
            ghosted={props.ghosted}
          >
            <IconContainer>
              <Icon icon={removeIcon} size={8} />
            </IconContainer>
          </RemoveButtonInner>
        </RemoveButtonOuter>}
    </Container>
  );
};

Chip.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  ghosted: PropTypes.bool,
  showRemoveButton: PropTypes.bool,
  onRemoveClick: PropTypes.func,
  margin: PropTypes.string,
};

export default Chip;
