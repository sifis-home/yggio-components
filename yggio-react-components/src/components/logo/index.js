/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {LogoImg} from './styled';

const Logo = (
  {
    src,
    alt,
    height,
    width,
    color,
    backgroundColor,
    margin,
  }
) => (
  <LogoImg
    src={src}
    alt={alt}
    height={height}
    width={width}
    color={color}
    backgroundColor={backgroundColor}
    margin={margin}
  />
);

Logo.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  margin: PropTypes.string,
};

export default Logo;
