import styled from 'styled-components';
import PropTypes from 'prop-types';

import {DEFAULTS} from './constants';

const ContainerButton = styled.button`
  width: ${({size}) => `${size || DEFAULTS.containerButtonSize}px`};
  height: ${({size}) => `${size || DEFAULTS.containerButtonSize}px`};
  margin: ${({margin}) => margin || DEFAULTS.containerButtonMargin};
  padding: ${({padding}) => padding || DEFAULTS.containerButtonPadding};
  opacity: ${({disabled}) => (disabled ? DEFAULTS.disabledOpacity : DEFAULTS.enabledOpacity)};
  background: transparent;
  border: none;
`;

ContainerButton.propTypes = {
  size: PropTypes.number,
  margin: PropTypes.string,
  padding: PropTypes.string,
};

const CircleMask = styled.div`
  width: ${({size}) => `${size || DEFAULTS.containerButtonSize}px`};
  height: ${({size}) => {
    const width = Math.floor((size || DEFAULTS.containerButtonSize) / 2);
    return `${width}px`;
  }};
  background: transparent;
  overflow: hidden;
  transform: ${({isTop}) => `scaleY(${isTop ? 1 : -1})`}
`;

CircleMask.propTypes = {
  size: PropTypes.number,
  isTop: PropTypes.bool,
};


// top: ${({isTop}) => (isTop ? '0px' : undefined)};
// bottom: 0px,

const InnerCircle = styled.div`
  width: ${({size}) => `${size || DEFAULTS.containerButtonSize}px`};
  height: ${({size}) => `${size || DEFAULTS.containerButtonSize}px`};
  border-radius: ${({size}) => {
    const width = Math.floor((size || DEFAULTS.containerButtonSize) / 2);
    return `${width}px`;
  }};
  background: ${({isSelected, isLoading}) => {
    if (isLoading) {
      return DEFAULTS.loadingColor;
    }
    if (isSelected) {
      return DEFAULTS.selectedColor;
    }
    return DEFAULTS.unselectedColor;
  }};
`;

InnerCircle.propTypes = {
  size: PropTypes.number,
  isSelected: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export {
  ContainerButton,
  CircleMask,
  InnerCircle,
};
