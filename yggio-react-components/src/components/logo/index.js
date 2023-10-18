import React from 'react';
import PropTypes from 'prop-types';
import {LogoImg} from './styled';

const Logo = (
  {
    src,
    alt,
    height,
    width,
    color,
    backgroundColor,
    margin,
  }
) => (
  <LogoImg
    src={src}
    alt={alt}
    height={height}
    width={width}
    color={color}
    backgroundColor={backgroundColor}
    margin={margin}
  />
);

Logo.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  margin: PropTypes.string,
};

export default Logo;
