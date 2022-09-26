/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// number-field/index.ts

import React from 'react';
import PropTypes from 'prop-types';

import {DEFAULTS} from './constants';
import InputDecorator from '../input-decorator';
import {StyledInput} from './styled';

const NumberField = props => (
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
      type={'number'}
      min={props.min}
      max={props.max}
      value={props.value}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onBlur={props.onBlur}
      disabled={props.isDisabled || props.disabled || DEFAULTS.isDisabled}
      disableBlueFocusOutline={props.disableBlueFocusOutline}
      isInvalid={!!props.validationErrorMessage}
    />
  </InputDecorator>
);

NumberField.propTypes = {
  // Input props
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  name: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  isDisabled: PropTypes.bool,
  disableBlueFocusOutline: PropTypes.bool,
  // Input decorator props
  label: PropTypes.string,
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

export default NumberField;
