/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// time-interval/index.js
import {compose} from 'lodash/fp';
import React from 'react';
import PropTypes from 'prop-types';

import {DEFAULTS} from './constants';
import InputDecorator from '../input-decorator';
import NumberField from '../number-field';
import {isFormValid} from '../../utils/form-wizard';
import Button from '../button';
import {
  TitleContainer,
  TableTitle,
  ColonContainer,
  TimeIntervalContainer,
} from './styled';

import {withState} from '../../hocs';
import {formState} from './state';
import {
  withAddDefaultTimeInterval
} from './effects';

const BasicTimeInterval = props => {
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
      fullHeight={props.fullHeight || DEFAULTS.fullHeight}
    >
      <TitleContainer>
        <TableTitle>Hours</TableTitle>
        <TableTitle>Minutes</TableTitle>
        <TableTitle>Seconds</TableTitle>
      </TitleContainer>
      <TimeIntervalContainer style={{display: 'flex'}}>
        <NumberField
          style={{display: 'inline-block'}}
          width={'100px'}
          name={'hours'}
          isRequired
          min={'0'}
          max={'595'}
          value={props.formInputs.hours.value}
          onChange={evt => props.setInputValue('hours', evt.target.value)}
        />
        <ColonContainer>:</ColonContainer>
        <NumberField
          style={{display: 'inline-block'}}
          width={'100px'}
          name={'minutes'}
          isRequired
          min={'0'}
          max={'59'}
          value={props.formInputs.minutes.value}
          onChange={evt => props.setInputValue('minutes', evt.target.value)}
        />
        <ColonContainer>:</ColonContainer>
        <NumberField
          style={{display: 'inline-block'}}
          width={'100px'}
          name={'seconds'}
          isRequired
          min={'0'}
          max={'59'}
          value={props.formInputs.seconds.value}
          onChange={evt => props.setInputValue('seconds', evt.target.value)}
        />
      </TimeIntervalContainer>
      <Button
        color={'green'}
        content={'Set'}
        margin={'20px 0 0 0'}
        disabled={!isFormValid(props.formInputs)}
        onClick={() => {
          const seconds = props.formInputs.seconds.value;
          const minutes = props.formInputs.minutes.value;
          const hours = props.formInputs.hours.value;
          const expectedReportInterval = (seconds * 1000) + (minutes * 60000) + (hours * 3600000);
          props.onChange(expectedReportInterval);
        }}
      />
    </InputDecorator>
  );
};

BasicTimeInterval.propTypes = {
  // Input props
  value: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  isDisabled: PropTypes.bool,
  disableBlueFocusOutline: PropTypes.bool,
  // Input decorator props
  label: PropTypes.string,
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

const RawTimeInterval = compose(
  withState(formState),
  withAddDefaultTimeInterval,
)(BasicTimeInterval);

RawTimeInterval.propTypes = {

};

export default RawTimeInterval;
