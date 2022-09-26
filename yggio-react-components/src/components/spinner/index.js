/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {spinner4 as spinnerIcon} from 'react-icons-kit/icomoon/spinner4';

import {SpinnerIcon} from './styled';
import {DEFAULTS} from './constants';

const Spinner = (
  {
    color,
    size,
    icon,
    speed,
    margin,
  }
) => (
  <SpinnerIcon
    speed={speed || DEFAULTS.speed}
    size={size || DEFAULTS.size}
    icon={icon || spinnerIcon}
    color={color || DEFAULTS.color}
    margin={margin || DEFAULTS.margin}
  />
);

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  icon: PropTypes.object,
  speed: PropTypes.number,
  margin: PropTypes.string,
};

export default Spinner;
