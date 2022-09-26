/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// styled.js

import styled from 'styled-components';
import {COLORS} from '../../../../constants';

const DropzoneDecorations = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${props => (props.width || '100%')};
  height: ${props => (props.height || '20vh')};
  border: 2px dashed ${COLORS.grey};
  color: ${props => (props.isDragging ? COLORS.white : COLORS.blueLight)};
  background: ${props => (props.isDragging && COLORS.grey)};
  transition: all 0.3s;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    color: ${COLORS.greyDark};
    border: 2px dashed ${COLORS.greyDark};
    transition: all 0.3s;
  }

  @media screen and (max-width: 900px) {
    width: 70%;
  }
`;

export {
  DropzoneDecorations,
};
