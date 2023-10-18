import React from 'react';

import {DEFAULTS} from './constants';
import InputDecorator from '../input-decorator';
import type {InputDecoratorProps} from '../input-decorator/types';
import {StyledInput} from './styled';

interface TextFieldProps extends InputDecoratorProps {
  value: string;
  maxLength?: number;
  height?: string;
  name?: string;
  placeholder?: string;
  onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  disabled?: boolean;
  isPassword?: boolean;
  disableBlueFocusOutline?: boolean;
  ariaLabel?: string;
}

const TextField = (props: TextFieldProps) => (
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

export default TextField;
