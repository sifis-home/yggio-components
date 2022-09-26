/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';
import {COLORS} from '../../constants';
import {DEFAULT_CLOSED_HEIGHT, DEFAULT_OPENED_HEIGHT} from './constants';

const Label = styled.div`
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  height: ${({open}) => (open ? '100%' : '0')};
  opacity: ${({open}) => (open ? '1' : '0')};
  visibility: ${({open}) => (open ? 'visible' : 'hidden')};
  transition: all 0.3s;
`;

const CollapsibleElement = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  cursor: pointer;
  color: ${({color}) => color || COLORS.black};
  height: ${({closedHeight, openedHeight, open}) => {
    if (open) {
      return openedHeight || DEFAULT_OPENED_HEIGHT;
    }

    return closedHeight || DEFAULT_CLOSED_HEIGHT;
  }};
  transition: height 0.3s;
`;

export {
  Label,
  Content,
  CollapsibleElement,
};
