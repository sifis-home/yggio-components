/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';

import {DEFAULTS} from './constants';

const LogoImg = styled.img`
  height: ${({height = DEFAULTS.height}) => height};
  width: ${({width = DEFAULTS.width}) => width};
  margin: ${({margin = DEFAULTS.margin}) => margin};
  color: ${({color = DEFAULTS.color}) => color};
  background-color: ${({backgroundColor = DEFAULTS.backgroundColor}) => backgroundColor};
  border-radius: 100%;
`;

export {
  LogoImg,
};
