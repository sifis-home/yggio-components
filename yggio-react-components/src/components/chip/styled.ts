import styled from 'styled-components';

import {CHIP_PRESETS, DEFAULTS, CHIP_TYPES} from './constant';
import ChipProps from './types';

const resolveBorder = (props: ChipProps) => {
  if (!props.ghosted) {
    return 'none';
  }
  const colorPresets = props.color ? CHIP_PRESETS[props.color] : CHIP_PRESETS[DEFAULTS.color];
  // const colorPresets = CHIP_PRESETS[props.color] || CHIP_PRESETS[DEFAULTS.color];
  return `1px solid ${colorPresets.ghosted.border}`;
};

const resolveBackground = (props: ChipProps) => {
  if (props.ghosted) {
    return 'none';
  }
  const colorPresets = props.color ? CHIP_PRESETS[props.color] : CHIP_PRESETS[DEFAULTS.color];
  return colorPresets.regular.background;
};

const resolveTextColor = (props: ChipProps) => {
  const colorPresets = props.color ? CHIP_PRESETS[props.color] : CHIP_PRESETS[DEFAULTS.color];
  const type = props.ghosted ? CHIP_TYPES.ghosted : CHIP_TYPES.regular;
  return colorPresets[type].text;
};

const resolveButtonColor = (props: ChipProps) => {
  const colorPresets = props.color ? CHIP_PRESETS[props.color] : CHIP_PRESETS[DEFAULTS.color];
  const type = props.ghosted ? CHIP_TYPES.ghosted : CHIP_TYPES.regular;
  return colorPresets[type].button;
};

const resolveButtonHoverColor = (props: ChipProps) => {
  const colorPresets = props.color ? CHIP_PRESETS[props.color] : CHIP_PRESETS[DEFAULTS.color];
  const type = props.ghosted ? CHIP_TYPES.ghosted : CHIP_TYPES.regular;
  return colorPresets[type].buttonHover;
};

const Container = styled.div<ChipProps>`
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

const RemoveButtonInner = styled.div<ChipProps>`
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

export {
  Container,
  Text,
  RemoveButtonOuter,
  RemoveButtonInner,
};
