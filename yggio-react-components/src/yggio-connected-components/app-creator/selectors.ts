import {APP_TYPES} from 'yggio-core-constants';

import {STEPS} from './constants';

const selectSteps = (selectedAppType: keyof typeof APP_TYPES) => {
  const steps = [STEPS.appType];

  steps.push(STEPS.details);

  if (selectedAppType === 'app') {
    steps.push(STEPS.app);
  }

  if (selectedAppType === 'clientApp') {
    steps.push(STEPS.clientApp);
  }

  steps.push(STEPS.confirmation);
  steps.push(STEPS.result);

  return steps;
};

export {
  selectSteps,
};
