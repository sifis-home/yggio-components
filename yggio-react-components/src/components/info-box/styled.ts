/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled from 'styled-components';

import {DEFAULTS} from './constants';

interface BoxProps {
  typeStyle: {
    background: string;
    border: string;
  };
  margin?: string;
}

const Box = styled.div<BoxProps>`
  box-sizing: border-box;
  border-radius: 4px;
  padding: 13px 15px;
  background: ${props => props.typeStyle.background};
  border: 1px solid ${props => props.typeStyle.border};
  color: #333;
  margin: ${props => props.margin || DEFAULTS.margin};
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  color: ${props => props.color};
  margin-right: 5px;
`;

const Heading = styled.p`
  font-size: 14px;
  font-weight: bold;
`;

const Content = styled.div`
  margin: 5px 0 0 0;
  font-size: 13px;
`;

export {
  Box,
  TopSection,
  IconWrapper,
  Heading,
  Content,
};
