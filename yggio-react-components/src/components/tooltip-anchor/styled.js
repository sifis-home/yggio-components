/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';
import {DEFAULTS} from './constants';

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13px;
  height: 13px;
  margin: ${props => props.margin || DEFAULTS.margin};
  border-radius: 50%;
  font-size: 9px;
  background: #999;
  color: white;
`;

export {
  Circle,
};
