/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';

import {ParametersState} from './types';
import {STEPS} from './constants';

const getSteps = (parametersState: ParametersState) => {
  const steps: STEPS[] = [STEPS.searchDevice, STEPS.selectParameters];
  _.forEach(parametersState.parameters, (isChecked, parameter) => {
    if (isChecked) {
      steps.push(STEPS[parameter as STEPS]);
    }
  });
  steps.push(STEPS.finished);
  return steps;
};

export {
  getSteps,
};
