import React from 'react';
import PropTypes from 'prop-types';

import {DEFAULTS} from './constants';
import LogoIcon from '../logo';
import {
  GridWrapper,
  StackSpinner,
  StackLogoIcon,
  Spinner
} from './styled';

const LogoSpinner = (
  {
    color = DEFAULTS.color,
    size = DEFAULTS.size,
    borderSize = DEFAULTS.borderSize,
    speed = DEFAULTS.speed,
    logoSrc = DEFAULTS.logoSrc,
  }
) => (
  <GridWrapper
    size={size}
    borderSize={borderSize}
  >
    <StackSpinner>
      <Spinner
        speed={speed}
        color={color}
        size={size + (borderSize * 2)}
        borderSize={borderSize}
      >
        <div /><div /><div /><div />
      </Spinner>
    </StackSpinner>
    <StackLogoIcon
      margin={borderSize}
    >
      <LogoIcon
        src={logoSrc}
        backgroundColor={color}
        width={`${size}px`}
        height={`${size}px`}
      />
    </StackLogoIcon>
  </GridWrapper>

);

LogoSpinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  speed: PropTypes.number,
};

export default LogoSpinner;
