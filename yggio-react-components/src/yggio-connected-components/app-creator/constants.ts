/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {APP_TYPES} from 'yggio-core-constants';

const READABLE_APP_TYPES = {
  [APP_TYPES.app]: 'App - basic application',
  [APP_TYPES.clientApp]: 'Client App - OAuth client application',
  [APP_TYPES.sifisHome]: 'Sifis Home App',
};

enum STEPS {
  appType = 1,
  details,
  app,
  clientApp,
  confirmation,
  result,
}

const PROGRESS_BAR_TITLES = {
  [STEPS.appType]: 'App Type',
  [STEPS.app]: 'App',
  [STEPS.clientApp]: 'Client App',
  [STEPS.details]: 'Details',
  [STEPS.confirmation]: 'Confirmation',
  [STEPS.result]: 'Result',
};

export {
  READABLE_APP_TYPES,
  STEPS,
  PROGRESS_BAR_TITLES,
};
