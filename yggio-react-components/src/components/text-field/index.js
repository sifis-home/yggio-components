/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import PropTypes from 'prop-types';

import {DEFAULTS} from './constants';
import InputDecorator from '../input-decorator';
import {StyledInput} from './styled';

const TextField = props => (
  <InputDecorator
    label={props.label}
    additionalInfo={props.additionalInfo}
    isRequired={props.isRequired}
    isOptional={props.isOptional}
    helperText={props.helperText}
    validationErrorMessage={props.validationErrorMessage}
    validationSuccessMessage={props.validationSuccessMessage}
    width={props.width}
    margin={props.margin}
    fullHeight={props.fullHeight || DEFAULTS.fullHeight}
  >
    <StyledInput
      maxLength={props.maxLength}
      height={props.height}
      value={props.value}
      aria-label={props.ariaLabel}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onBlur={props.onBlur}
      disabled={props.isDisabled || props.disabled || DEFAULTS.isDisabled}
      type={props.isPassword ? 'password' : DEFAULTS.type}
      disableBlueFocusOutline={props.disableBlueFocusOutline}
      isInvalid={!!props.validationErrorMessage}
    />
  </InputDecorator>
);

TextField.propTypes = {
  // Input props
  maxLength: PropTypes.number,
  height: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  isDisabled: PropTypes.bool,
  isPassword: PropTypes.bool,
  disableBlueFocusOutline: PropTypes.bool,
  // Input decorator props
  label: PropTypes.string,
  ariaLabel: PropTypes.string,
  additionalInfo: PropTypes.string,
  isRequired: PropTypes.bool,
  isOptional: PropTypes.bool,
  helperText: PropTypes.string,
  validationErrorMessage: PropTypes.string,
  validationSuccessMessage: PropTypes.string,
  width: PropTypes.string,
  margin: PropTypes.string,
  fullHeight: PropTypes.bool,
};

export default TextField;
