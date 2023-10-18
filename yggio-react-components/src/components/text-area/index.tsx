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

interface TextAreaProps extends InputDecoratorProps {
  value: string;
  height?: string;
  name?: string;
  resize?: string;
  placeholder?: string;
  onChange?: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (evt: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isDisabled?: boolean;
  disableBlueFocusOutline?: boolean;
  ariaLabel?: string;
}

const TextArea = (props: TextAreaProps) => (
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

export default TextArea;
