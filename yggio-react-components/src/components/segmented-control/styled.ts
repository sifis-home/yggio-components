/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled, {css} from 'styled-components';

import {DEFAULTS} from './constants';

interface WrapperProps {
  width: string;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  width: ${({width}) => width};
`;

interface SegmentProps {
  height?: string;
  isActive: boolean;
}

const Segment = styled.div<SegmentProps>`
  display: flex;
  font-size: 13px;
  flex-grow: 1;
  flex-basis: 0;
  justify-content: center;
  align-items: center;
  height: ${({height}) => height || DEFAULTS.height};
  border: 1px solid #666;
  border-right-width: 0;
  color: ${({isActive}) => (isActive ? 'white' : '#444')};
  background: ${({isActive}) => (isActive ? '#666' : 'none')};

  ${({isActive}) => !isActive && css`
    &:hover {
      background: #eee;
    }
    cursor: pointer;
  `};
  &:first-child {
    border-radius: 5px 0 0 5px;

  }
  &:last-child {
    border-radius: 0 5px 5px 0;
    border-right-width: 1px;
  }
`;

export {
  Wrapper,
  Segment,
};
