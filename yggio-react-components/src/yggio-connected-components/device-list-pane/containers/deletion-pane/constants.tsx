/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';

const STEPS_NAMES = {
  confirmation: 'confirmation',
  summary: 'summary',
};

const STEPS = [
  {name: STEPS_NAMES.confirmation, progressBarTitle: _.capitalize(STEPS_NAMES.confirmation)},
  {name: STEPS_NAMES.summary, progressBarTitle: _.capitalize(STEPS_NAMES.summary)},
];

export {
  STEPS_NAMES,
  STEPS,
};
