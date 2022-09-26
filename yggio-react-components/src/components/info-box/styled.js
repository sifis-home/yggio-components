/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';

import {DEFAULTS} from './constants';

const Box = styled.div`
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
  margin-right: 6px;
  position: relative;
`;

const Heading = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 500;
`;

const Content = styled.div`
  margin: 7px 0 0 0;
`;

export {
  Box,
  TopSection,
  IconWrapper,
  Heading,
  Content,
};
