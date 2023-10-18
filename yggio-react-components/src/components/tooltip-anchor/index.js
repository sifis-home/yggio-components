/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import {MdInfoOutline as InfoIcon} from 'react-icons/md';

import {DEFAULTS} from './constants';

const TooltipAnchor = props => (
  <>
    <InfoIcon
      size={18}
      color={'#555'}
      style={{margin: props.margin || '0'}}
      data-tip
      data-for={props.id}
    />
    <ReactTooltip
      id={props.id}
      place={props.tooltipPlacement || DEFAULTS.tooltipPlacement}
      effect="solid"
    >
      {props.text}
    </ReactTooltip>
  </>
);

TooltipAnchor.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  id: PropTypes.string.isRequired,
  tooltipPlacement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  margin: PropTypes.string,
};

export default TooltipAnchor;
