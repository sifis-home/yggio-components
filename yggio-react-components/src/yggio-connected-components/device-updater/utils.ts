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
