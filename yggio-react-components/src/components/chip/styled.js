/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';

import {CHIP_PRESETS, DEFAULTS, CHIP_TYPES} from './constant';

const resolveBorder = ({ghosted, color}) => {
  if (!ghosted) {
    return 'none';
  }
  const colorPresets = CHIP_PRESETS[color] || CHIP_PRESETS[DEFAULTS.color];
  return `1px solid ${colorPresets.ghosted.border}`;
};

const resolveBackground = ({ghosted, color}) => {
  if (ghosted) {
    return 'none';
  }
  const colorPresets = CHIP_PRESETS[color] || CHIP_PRESETS[DEFAULTS.color];
  return colorPresets.regular.background;
};

const resolveTextColor = ({ghosted, color}) => {
  const colorPresets = CHIP_PRESETS[color] || CHIP_PRESETS[DEFAULTS.color];
  const type = ghosted ? CHIP_TYPES.ghosted : CHIP_TYPES.regular;
  return colorPresets[type].text;
};

const resolveButtonColor = ({ghosted, color}) => {
  const colorPresets = CHIP_PRESETS[color] || CHIP_PRESETS[DEFAULTS.color];
  const type = ghosted ? CHIP_TYPES.ghosted : CHIP_TYPES.regular;
  return colorPresets[type].button;
};

const resolveButtonHoverColor = ({ghosted, color}) => {
  const colorPresets = CHIP_PRESETS[color] || CHIP_PRESETS[DEFAULTS.color];
  const type = ghosted ? CHIP_TYPES.ghosted : CHIP_TYPES.regular;
  return colorPresets[type].buttonHover;
};

const Container = styled.div`
  width: fit-content;
  padding: 0 ${({showRemoveButton}) => (showRemoveButton ? '3px' : '6px')} 0 7px;
  height: 22px;
  margin: ${({margin}) => margin || DEFAULTS.margin};
  box-sizing: border-box;
  background: ${props => resolveBackground(props)};
  border: ${props => resolveBorder(props)};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  font-size: 11px;
  color: ${props => resolveTextColor(props)};
  flex-shrink: 0;
`;

const Text = styled.p`
  margin: 0;
  position: relative;
  top: -1px;
  white-space: nowrap;
`;

const RemoveButtonOuter = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const RemoveButtonInner = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => resolveButtonColor(props)};
  color: #fff;

  ${RemoveButtonOuter}:hover & {
    background: ${props => resolveButtonHoverColor(props)};
  }
`;

const IconContainer = styled.div`
  position: relative;
  top: -2px;
`;

export {
  Container,
  Text,
  RemoveButtonOuter,
  RemoveButtonInner,
  IconContainer,
};
