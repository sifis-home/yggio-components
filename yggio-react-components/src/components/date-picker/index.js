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

const DatePicker = props => (
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
  >
    <StyledInput
      style={props.style}
      value={props.value}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      maxWidth={props.maxWidth || DEFAULTS.maxWidth}
      onBlur={props.onBlur}
      disabled={props.isDisabled || props.disabled || DEFAULTS.isDisabled}
      type={props.isOnlyDate ? 'date' : 'datetime-local'}
      disableBlueFocusOutline={props.disableBlueFocusOutline}
      isInvalid={!!props.validationErrorMessage}
    />
  </InputDecorator>
);

DatePicker.propTypes = {
  // Input props
  value: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  isDisabled: PropTypes.bool,
  isPassword: PropTypes.bool,
  disableBlueFocusOutline: PropTypes.bool,
  isOnlyDate: PropTypes.bool,
  // Input decorator props
  label: PropTypes.string,
  additionalInfo: PropTypes.string,
  isRequired: PropTypes.bool,
  isOptional: PropTypes.bool,
  helperText: PropTypes.string,
  validationErrorMessage: PropTypes.string,
  validationSuccessMessage: PropTypes.string,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  margin: PropTypes.string,
};

export default DatePicker;
