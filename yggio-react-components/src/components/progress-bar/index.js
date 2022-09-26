/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Bar,
  Filling,
} from './styled';

const ProgressBar = props => (
  <Bar
    barColor={props.barColor}
    width={props.width}
    height={props.height}
    margin={props.margin}
  >
    <Filling
      progress={props.progress}
      fillColor={props.fillColor}
      height={props.height}
    />
  </Bar>
);

ProgressBar.propTypes = {
  progress: PropTypes.number,
  barColor: PropTypes.string,
  fillColor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.number,
  margin: PropTypes.string,
};

export default ProgressBar;
