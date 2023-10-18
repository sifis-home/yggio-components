import React from 'react';
import ReactSelect, {MenuPlacement} from 'react-select';
import _ from 'lodash';

import InputDecorator from '../input-decorator';
import {InputDecoratorProps} from '../input-decorator/types';
import {createStyles} from './styles';
import {Option} from './types';

interface SelectProps extends InputDecoratorProps {
  value?: string;
  options: Option[];
  name?: string;
  placeholder?: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  isLoading?: boolean;
  menuPlacement?: MenuPlacement;
  height?: string;
  styles?: unknown;
}

const Select = (props: SelectProps) => {

  return (
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
      fullHeight={props.fullHeight}
    >
      <ReactSelect
        aria-label={props.ariaLabel}
        options={props.options}
        name={props.name}
        styles={props.styles || createStyles(props.height)}
        isDisabled={props.isDisabled || props.disabled}
        isSearchable={!!props.isSearchable}
        isClearable={props.isClearable}
        isLoading={props.isLoading}
        value={_.find(props.options, {value: props.value})}
        placeholder={props.placeholder}
        menuPlacement={props.menuPlacement || 'auto'}
        onChange={evt => {
          const customEvt = {
            target: {
              value: evt?.value,
              name: props.name,
            },
          } as React.ChangeEvent<HTMLInputElement>;
          props.onChange(customEvt);
        }}
        onBlur={() => {
          if (!props.onBlur) return;
          const customEvt = {
            target: {
              value: props.value,
              name: props.name,
            },
          } as React.ChangeEvent<HTMLInputElement>;
          props.onBlur(customEvt);
        }}
      />
    </InputDecorator>
  );
};

export default Select;
