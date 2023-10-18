/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled from 'styled-components';

import {DEFAULTS} from './constants';

interface ProgressBarProps {
  progress?: number;
  barColor?: string;
  fillColor?: string;
  width?: string;
  height?: number;
  margin?: string;
}

const Bar = styled.div<ProgressBarProps>`
  width: ${({width}) => width || DEFAULTS.width};
  height: ${({height}) => height || DEFAULTS.height}px;
  border-radius: ${({height}) => (height || DEFAULTS.height) / 2}px;
  background: ${({barColor}) => barColor || DEFAULTS.barColor};
  margin: ${({margin}) => margin || DEFAULTS.margin};
`;

const Filling = styled.div<ProgressBarProps>`
  width: 100%;
  height: ${({height}) => height || DEFAULTS.height}px;
  border-radius: ${({height}) => (height || DEFAULTS.height) / 2}px;
  background: ${({fillColor}) => fillColor || DEFAULTS.fillColor};
  clip-path: ${({progress}) => `inset(0 ${100 - progress!}% 0 0)`};
`;

export {
  Bar,
  Filling,
};
