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

import {
  DEFAULTS,
  TYPE_STYLES,
} from './constants';
import {
  Box,
  TopSection,
  IconWrapper,
  Heading,
  Content,
} from './styled';

const InfoBox = props => {
  const typeStyle = TYPE_STYLES[props.type] || TYPE_STYLES[DEFAULTS.type];
  return (
    <Box
      typeStyle={typeStyle}
      margin={props.margin}
      style={{width: props.width, height: props.height}}
    >
      <TopSection>
        {!props.hideIcon &&
          <IconWrapper color={typeStyle.iconColor}>
            <Icon icon={typeStyle.icon} size={17} />
          </IconWrapper>}
        <Heading>{props.heading}</Heading>
      </TopSection>
      {props.content &&
        <Content>{props.content}</Content>}
    </Box>
  );
};

InfoBox.propTypes = {
  heading: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  type: PropTypes.oneOf(['info', 'neutral', 'success', 'warning', 'error']),
  margin: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default InfoBox;
