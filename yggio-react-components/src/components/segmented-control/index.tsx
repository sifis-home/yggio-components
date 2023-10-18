/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';

import InputDecorator from '../input-decorator';
import {InputValue} from '../../types';
import {
  Wrapper,
  Segment,
} from './styled';
import {DEFAULTS} from './constants';

interface SegmentedControlProps {
  options: {value: InputValue, label: string}[];
  value: InputValue;
  onChange: (value: InputValue) => void;
  width?: string;
  segmentWidth?: number;
  height?: string;
  margin?: string;
  // Input decorator props
  label?: string;
  additionalInfo?: string;
  isRequired?: boolean;
  isOptional?: boolean;
  helperText?: string;
  fullHeight?: boolean;
}

const SegmentedControl = (props: SegmentedControlProps) => {
  const calculatedWidth = (props.segmentWidth || DEFAULTS.segmentWidth) * props.options.length;
  const totalWidth = props.width || `${calculatedWidth}px`;
  return (
    <InputDecorator
      label={props.label}
      additionalInfo={props.additionalInfo}
      isRequired={props.isRequired}
      isOptional={props.isOptional}
      helperText={props.helperText}
      margin={props.margin}
      fullHeight={props.fullHeight}
    >
      <Wrapper width={totalWidth}>
        {_.map(props.options, option => (
          <Segment
            key={_.toString(option.value)}
            height={props.height}
            isActive={option.value === props.value}
            onClick={() => {
              if (option.value !== props.value) {
                props.onChange(option.value);
              }
            }}
          >
            {option.label}
          </Segment>
        ))}
      </Wrapper>
    </InputDecorator>
  );
};

export default SegmentedControl;
