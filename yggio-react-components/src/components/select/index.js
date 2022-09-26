/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import _ from 'lodash';

import InputDecorator from '../input-decorator';
import {customStyles} from './styles';

const Select = props => {

  let value;
  if (props.value === null) {
    value = null;
  } else if (!_.isNil(props.value)) {
    value = _.find(props.options, {value: props.value});
  }

  const onChange = val => {
    const evt = {
      target: {
        value: props.isMulti ? _.map(val, 'value') : _.get(val, 'value'),
        name: props.name,
      },
    };
    props.onChange(evt);
  };

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
        onChange={onChange}
        styles={customStyles}
        isDisabled={props.isDisabled || props.disabled}
        isSearchable={!!props.isSearchable}
        isClearable={props.isClearable}
        isLoading={props.isLoading}
        isMulti={props.isMulti}
        value={value}
        placeholder={props.placeholder}
        onBlur={() => {
          if (!props.onBlur) return;
          const evt = {
            target: {
              value: props.value,
              name: props.name,
            },
          };
          props.onBlur(evt);
        }}
        menuPlacement={props.menuPlacement || 'auto'}
      />
    </InputDecorator>
  );
};

Select.propTypes = {
  // Input props
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  isDisabled: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isClearable: PropTypes.bool,
  isLoading: PropTypes.bool,
  isMulti: PropTypes.bool,
  menuPlacement: PropTypes.oneOf(['auto', 'bottom', 'top']),
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
  onBlur: PropTypes.func,
};

export default Select;
