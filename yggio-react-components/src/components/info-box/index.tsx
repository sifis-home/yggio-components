/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {ReactNode} from 'react';

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

interface InfoBoxProps {
  heading: string;
  content?: string | ReactNode;
  type?: 'info' | 'neutral' | 'success' | 'warning' | 'error';
  margin?: string;
  width?: string;
  height?: string;
}

const InfoBox = (props: InfoBoxProps) => {
  const typeStyle = props.type ? TYPE_STYLES[props.type] : TYPE_STYLES[DEFAULTS.type];
  return (
    <Box
      typeStyle={typeStyle}
      margin={props.margin}
      style={{width: props.width, height: props.height}}
    >
      <TopSection>
        <IconWrapper color={typeStyle.iconColor}>
          <typeStyle.icon size={17} />
        </IconWrapper>
        <Heading>{props.heading}</Heading>
      </TopSection>
      {props.content &&
        <Content>{props.content}</Content>}
    </Box>
  );
};

export default InfoBox;
