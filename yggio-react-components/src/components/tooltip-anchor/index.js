/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import {Icon} from 'react-icons-kit';
import {info as infoIcon} from 'react-icons-kit/entypo/info';

import {DEFAULTS} from './constants';
import {Circle} from './styled';

const TooltipAnchor = props => (
  <>
    <Circle
      data-tip
      data-for={props.id}
      margin={props.margin}
    >
      <Icon icon={infoIcon} size={9} />
    </Circle>
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
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  tooltipPlacement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  margin: PropTypes.string,
};

export default TooltipAnchor;
