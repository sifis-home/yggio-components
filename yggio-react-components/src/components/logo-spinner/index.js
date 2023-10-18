/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import PropTypes from 'prop-types';

import {DEFAULTS} from './constants';
import LogoIcon from '../logo';
import {
  GridWrapper,
  StackSpinner,
  StackLogoIcon,
  Spinner
} from './styled';

const LogoSpinner = (
  {
    color = DEFAULTS.color,
    size = DEFAULTS.size,
    borderSize = DEFAULTS.borderSize,
    speed = DEFAULTS.speed,
    logoSrc = DEFAULTS.logoSrc,
  }
) => (
  <GridWrapper
    size={size}
    borderSize={borderSize}
  >
    <StackSpinner>
      <Spinner
        speed={speed}
        color={color}
        size={size + (borderSize * 2)}
        borderSize={borderSize}
      >
        <div /><div /><div /><div />
      </Spinner>
    </StackSpinner>
    <StackLogoIcon
      margin={borderSize}
    >
      <LogoIcon
        src={logoSrc}
        backgroundColor={color}
        width={`${size}px`}
        height={`${size}px`}
      />
    </StackLogoIcon>
  </GridWrapper>

);

LogoSpinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  speed: PropTypes.number,
};

export default LogoSpinner;
