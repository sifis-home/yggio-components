/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';

import {
  TIME_PERIODS,
  RESOLUTIONS,
  INTERPOLATION_OPTIONS,
  RANGES,
} from '../constants';
import {Form, InputValue} from '../../../types';

import DatePicker from '../../../components/date-picker';
import SegmentedControl from '../../../components/segmented-control';
import Select from '../../../components/select';
import {OptionsSection, LowerSectionHeading} from '../styled';

const SEGMENT_WIDTH = 100;

interface Props {
  form: Form;
  hideLegend?: boolean;
}

const Options = (props: Props) => {
  return (
    <OptionsSection>
      {!props.hideLegend && (
        <LowerSectionHeading>Options</LowerSectionHeading>
      )}
      <Select
        label={'Time period'}
        options={[..._.map(TIME_PERIODS, (period, key) => ({
          value: key,
          label: period.name,
        })), {label: 'Custom', value: 'custom'}]}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => (
          props.form.setInputValue('timePeriod', evt.target.value)
        )}
        value={props.form.formInputs.timePeriod.value as string}
        margin={'0 0 15px 0'}
        width={'300px'}
      />
      {props.form.formInputs.timePeriod.value === 'custom' && (
        <>
          <DatePicker
            label={'From'}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              props.form.setInputValue('customFromTime', evt.target.value);
              props.form.showInputValidation('customFromTime');
            }}
            value={props.form.formInputs.customFromTime.value as string}
            validationErrorMessage={props.form.formInputs.customFromTime.validation.isVisible
              ? props.form.formInputs.customFromTime.validation.message
              : null}
            margin={'0 0 15px 0'}
            maxWidth={'300px'}
          />
          <DatePicker
            label={'To'}
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              props.form.setInputValue('customToTime', evt.target.value);
              props.form.showInputValidation('customToTime');
            }}
            value={props.form.formInputs.customToTime.value as string}
            validationErrorMessage={props.form.formInputs.customToTime.validation.isVisible
              ? props.form.formInputs.customToTime.validation.message
              : null}
            margin={'0 0 15px 0'}
            maxWidth={'300px'}
          />
        </>
      )}
      <SegmentedControl
        label={'Resolution'}
        options={_.map(RESOLUTIONS, r => ({value: r, label: r}))}
        onChange={(value: InputValue) => props.form.setInputValue('resolution', value)}
        value={props.form.formInputs.resolution.value as string}
        segmentWidth={SEGMENT_WIDTH}
        margin={'0 0 15px 0'}
      />
      <SegmentedControl
        label={'Interpolation'}
        options={_.values(INTERPOLATION_OPTIONS)}
        onChange={(value: InputValue) => props.form.setInputValue('interpolation', value)}
        value={props.form.formInputs.interpolation.value as string}
        segmentWidth={SEGMENT_WIDTH}
        margin={'0 0 15px 0'}
      />
      <SegmentedControl
        label={'Range'}
        options={_.map(RANGES, r => ({value: r, label: r}))}
        onChange={(value: InputValue) => props.form.setInputValue('range', value)}
        value={props.form.formInputs.range.value as string}
        segmentWidth={SEGMENT_WIDTH}
      />
    </OptionsSection>
  );
};

export default Options;
