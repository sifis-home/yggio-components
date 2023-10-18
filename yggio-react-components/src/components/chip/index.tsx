/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {MdClose as CrossIcon} from 'react-icons/md';

import {
  Container,
  Text,
  RemoveButtonOuter,
  RemoveButtonInner,
} from './styled';

interface ChipProps {
  text: string;
  color?: string;
  ghosted?: boolean;
  showRemoveButton?: boolean;
  onRemoveClick?: () => void;
  margin?: string;
}

const Chip = (props: ChipProps) => {
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
            <CrossIcon size={12} />
          </RemoveButtonInner>
        </RemoveButtonOuter>}
    </Container>
  );
};

export default Chip;
