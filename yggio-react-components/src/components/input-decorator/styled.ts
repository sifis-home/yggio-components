/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled from 'styled-components';

import {DEFAULTS} from './constants';
import {COLORS} from '../../constants';

interface WrapperProps {
  margin?: string;
  width?: string;
}

const Wrapper = styled.div<WrapperProps>`
  margin: ${({margin}) => margin || DEFAULTS.margin};
  display: flex;
  flex-direction: column;
  width: ${({width}) => width || DEFAULTS.width};
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 3px 0px;
`;

const Label = styled.p`
  color: ${COLORS.greyDark};
  margin: 0;
  padding: 0;
  font-size: 13px;
  font-weight: 500;
`;

const EnforcementNote = styled.p`
  color: #666;
  margin: 0 0 0 6px;
  padding: 0;
  font-size: 12px;
  color: #777;
`;

const BottomContainer = styled.div`
  height: 13px;
  display: flex;
  align-items: center;
  padding: 5px 0 0 5px;
  font-size: 12px;
  color: ${({color}) => color};
  p {
    margin: 0;
  }
`;

const IconWrapper = styled.div`
  margin: 0 4px 0 0;
`;

export {
  Wrapper,
  TopContainer,
  Label,
  EnforcementNote,
  BottomContainer,
  IconWrapper,
};
