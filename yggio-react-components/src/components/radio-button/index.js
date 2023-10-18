import React from 'react';
import PropTypes from 'prop-types';

import {
  ContainerButton,
  CircleMask,
  InnerCircle,
} from './styled';

const RadioButton = props => (
  <ContainerButton
    title={props.title}
    size={props.size}
    padding={props.padding}
    margin={props.margin}
    onClick={props.onClick}
    disabled={props.disabled || props.isLoading}
  >

    <CircleMask
      isTop
      size={props.size}
    >
      <InnerCircle
        size={props.size}
        isSelected={props.isSelected}
        isLoading={false}
      />
    </CircleMask>

    <CircleMask
      isTop={false}
      size={props.size}
    >
      <InnerCircle
        size={props.size}
        isSelected={props.isSelected}
        isLoading={props.isLoading}
      />
    </CircleMask>

  </ContainerButton>
);

RadioButton.propTypes = {
  size: PropTypes.number,
  padding: PropTypes.string,
  title: PropTypes.string,
  margin: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isSelected: PropTypes.bool,
};

export default RadioButton;
