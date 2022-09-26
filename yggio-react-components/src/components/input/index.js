/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {map, eq, find} from 'lodash/fp';
import PropTypes from 'prop-types';
import {
  Wrapper,
  BaseInput,
  BaseSelect,
  BaseTextArea,
  Label,
} from './styled';

// NOTE: This component is depricated. Use textfield, select, textarea etc instead

const Input = (
  {
    type = 'text',
    label,
    placeholder,
    color,
    background,
    width,
    height,
    margin,
    name,
    onChange,
    value,
    defaultValue,
    options,
    valid,
  }
) => {
  const inputTypes = [
    'text',
    'number',
    'date',
    'email',
    'password',
    'radio',
    'file',
  ];
  return (
    <Wrapper margin={margin} width={width}>
      {label && <Label>{label}</Label>}
      {
        eq(type, 'select') &&
          <BaseSelect
            color={color}
            background={background}
            height={height}
            type="select"
            defaultValue={defaultValue}
            onChange={onChange}
          >
            {map(({value, label}) => (
              <option key={value} value={value}>{label}</option>
            ), options)}
          </BaseSelect>
      }

      {find(eq(type), inputTypes) && (
        <BaseInput
          valid={valid}
          color={color}
          background={background}
          height={height}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}

      {
        eq(type, 'textarea') &&
          <BaseTextArea
            color={color}
            background={background}
          // height={height}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
          />
      }
    </Wrapper>
  );
};

Input.propTypes = {
  color: PropTypes.string,
  background: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Input;
