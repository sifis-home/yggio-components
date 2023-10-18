/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
