/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';

import {FormInputs} from '../../types';
import {Data, TickSettings} from './types';

const resolveNumDecimals = (data: Data) => {
  let maxValue = -Infinity;
  _.forEach(data, device => {
    if (_.isNull(device.value)) return;
    if (Math.abs(device.value) > maxValue) maxValue = Math.abs(device.value);
  });
  if (maxValue === 0) return 2;
  // ex: ..., 1000 => 0, 100 => 0, 10 => 1, 1 => 2, 0.1 => 3, 0.01 => 4, ...
  return Math.max(0, 2 - Math.floor(Math.log10(Math.abs(maxValue))));
};

// Note: form-wizards validation was insufficient
const isFormValid = (formInputs: FormInputs) => {
  if (
    formInputs.timePeriod.value === 'custom' &&
    (!formInputs.customFromTime.validation.isValid ||
      !formInputs.customToTime.validation.isValid)) {
    return false;
  }
  return true;
};

const generateTicks = (tickSettings: TickSettings, nowUnix: number) => {
  const lastTick = tickSettings.getLastTick(nowUnix);
  return _.times(
    tickSettings.numTicks,
    i => lastTick - (tickSettings.numTicks - 1 - i) * tickSettings.distance,
  );
};

export {
  resolveNumDecimals,
  isFormValid,
  generateTicks,
};
