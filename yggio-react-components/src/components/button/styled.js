import _ from 'lodash';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  SIZES,
  WIDTHS,
  DEFAULT_WIDTH,
  HEIGHTS,
  DEFAULT_HEIGHT,
  BUTTON_TYPES,
  BUTTON_PRESETS,
  DEFAULT_PRESET,
  DISABLED_PRESETS,
} from './constants';

// ////
// style resolvers
// ////

const resolveBorderColor = ({disabled, color, style}) => {
  if (disabled) {
    return DISABLED_PRESETS.ghosted.border;
  }
  // if we can determine a preset, then use it
  const preset = BUTTON_PRESETS[color];
  if (preset) {
    return preset.ghosted.border;
  }
  // otherwide default to hard-coded values
  return color || _.get(style, 'color', DEFAULT_PRESET.ghosted.border);
};

const resolveBorder = ({ghosted, disabled, color, style, noBorder}) => {
  if (!ghosted || noBorder) {
    return 'none';
  }
  const borderColor = resolveBorderColor({ghosted, disabled, color, style});
  return `1px solid ${borderColor}`;
};

const resolveBackground = ({ghosted, disabled, color, style}) => {
  // only NON-ghosted buttons have a background
  if (ghosted) {
    return 'none';
  }
  if (disabled) {
    return DISABLED_PRESETS.regular.background;
  }
  // if we can determine a preset, then use it
  const preset = BUTTON_PRESETS[color];
  if (preset) {
    return preset.regular.background;
  }
  // otherwise default to hard-coded values
  return color || _.get(style, 'background', DEFAULT_PRESET.regular.background);
};

const resolveHoverBackground = ({ghosted, disabled, color, style}) => {
  const type = ghosted ? BUTTON_TYPES.ghosted : BUTTON_TYPES.regular;
  if (disabled) {
    return 'default';
  }
  const preset = BUTTON_PRESETS[color];
  if (preset) {
    return preset[type].hoverBackground;
  }

  return color || _.get(style, 'hoverBackground', DEFAULT_PRESET[type].hoverBackground);
};

const resolveTextColor = ({ghosted, disabled, color, style}) => {
  const type = ghosted ? BUTTON_TYPES.ghosted : BUTTON_TYPES.regular;
  if (disabled) {
    return DISABLED_PRESETS[type].text;
  }
  // if we can determine a preset, then use it
  const preset = BUTTON_PRESETS[color];
  if (preset) {
    return preset[type].text;
  }
  // otherwise default to hard-coded values
  return color || _.get(style, 'color', DEFAULT_PRESET[type].text);
};

const resolveHeight = ({size, height, style}) => {
  const propHeight = HEIGHTS[height || size] || height || size;
  if (!_.isUndefined(propHeight)) {
    return propHeight;
  }
  return _.get(style, 'height', DEFAULT_HEIGHT);
};

const resolveWidth = ({size, width, style}) => {
  const propWidth = WIDTHS[width || size] || width || size;
  if (!_.isUndefined(propWidth)) {
    return propWidth;
  }
  return _.get(style, 'width', DEFAULT_WIDTH);
};

// ////
// components
// ////

const StyledButton = styled.button`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  border-radius: 3px;
  outline: none;
  font-family: inherit;
  font-size: 14px;

  border: ${props => resolveBorder(props)};
  background: ${props => resolveBackground(props)};
  color: ${props => resolveTextColor(props)};
  width: ${props => resolveWidth(props)};
  height: ${props => resolveHeight(props)};

  margin: ${props => _.get(props, 'margin', _.get(props, 'style.margin'), '0')};
  padding: ${props => _.get(props, 'padding', _.get(props, 'style.padding'), '0 16px')};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};

  &:hover {
    transition: all 0.3s;
    background: ${props => resolveHoverBackground(props)};
  }
  &:focus {
    box-shadow: 0 0 2px 1px #4287f5;
  }
`;

StyledButton.propTypes = {
  ghosted: PropTypes.bool,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  size: PropTypes.oneOf(_.values(SIZES)),
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  margin: PropTypes.string,
  padding: PropTypes.string,
};

export {
  StyledButton,
  resolveTextColor,
};
