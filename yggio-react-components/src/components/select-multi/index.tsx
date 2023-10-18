import React from 'react';
import ReactSelect, {MenuPlacement} from 'react-select';
import _ from 'lodash';

import InputDecorator from '../input-decorator';
import {InputDecoratorProps} from '../input-decorator/types';
import {customStyles} from './styles';
import {Option} from './types';

interface CustomEvt {
  target: {
    value: string[];
    name?: string;
  }
}

interface SelectMultiProps extends InputDecoratorProps {
  options: Option[];
  maxLength?: number;
  name?: string;
  value: string[];
  placeholder?: string;
  onChange: (evt: CustomEvt) => void;
  isDisabled?: boolean;
  disabled?: boolean;
  isPassword?: boolean;
  disableBlueFocusOutline?: boolean;
  ariaLabel?: string;
  isSearchable?: boolean;
  isClearable?: boolean;
  isLoading?: boolean;
  menuPlacement?: MenuPlacement;
}

const SelectMulti = (props: SelectMultiProps) => {
  const value = _.filter(props.options, option => _.includes(props.value, option.value));
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
        isMulti
        value={value}
        name={props.name}
        styles={customStyles}
        isDisabled={props.isDisabled || props.disabled}
        isSearchable={!!props.isSearchable}
        isClearable={props.isClearable}
        isLoading={props.isLoading}
        placeholder={props.placeholder}
        menuPlacement={props.menuPlacement || 'auto'}
        onChange={evt => {
          const customEvt = {
            target: {
              value: _.map(evt, 'value'),
              name: props.name,
            },
          };
          props.onChange(customEvt);
        }}
      />
    </InputDecorator>
  );
};

export default SelectMulti;
