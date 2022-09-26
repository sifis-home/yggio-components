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

const TextArea = props => (
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
      value={props.value}
      name={props.name}
      aria-label={props.ariaLabel}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onBlur={props.onBlur}
      resize={props.resize}
      height={props.height}
      disabled={props.isDisabled || DEFAULTS.isDisabled}
      disableBlueFocusOutline={props.disableBlueFocusOutline}
      isInvalid={!!props.validationErrorMessage}
    />
  </InputDecorator>
);

TextArea.propTypes = {
  // Input props
  value: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  resize: PropTypes.string,
  height: PropTypes.string,
  isDisabled: PropTypes.bool,
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

export default TextArea;
