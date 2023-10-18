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

interface DatePickerProps extends InputDecoratorProps {
  value: string;
  maxWidth?: string;
  name?: string;
  placeholder?: string;
  isOnlyDate?: boolean;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  disabled?: boolean;
  disableBlueFocusOutline?: boolean;
}

const DatePicker = (props: DatePickerProps) => (
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

export default DatePicker;
