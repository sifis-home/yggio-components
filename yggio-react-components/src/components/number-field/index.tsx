/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';

import {DEFAULTS} from './constants';
import InputDecorator from '../input-decorator';
import type {InputDecoratorProps} from '../input-decorator/types';
import {StyledInput} from './styled';

interface NumberFieldProps extends InputDecoratorProps {
  value: number;
  height?: string;
  name?: string;
  min?: string;
  max?: string;
  resize?: string;
  placeholder?: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  disabled?: boolean;
  disableBlueFocusOutline?: boolean;
  ariaLabel?: string;
}

const NumberField = (props: NumberFieldProps) => (
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

export default NumberField;
