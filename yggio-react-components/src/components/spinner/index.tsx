/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {ImSpinner8 as LoadingIcon} from 'react-icons/im';

import {Container} from './styled';
import {DEFAULTS} from './constants';

interface SpinnerProps {
  color?: string;
  size?: number;
  speed?: number;
  margin?: string;
}

const Spinner = (props: SpinnerProps) => (
  <Container
    margin={props.margin || DEFAULTS.margin}
  >
    <LoadingIcon
      size={props.size || DEFAULTS.size}
      color={props.color || DEFAULTS.color}
    />
  </Container>
);

export default Spinner;
