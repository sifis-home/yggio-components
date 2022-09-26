/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
enum STEPS {
  searchDevice = 'searchDevice',
  selectParameters = 'selectParameters',
  finished = 'finished',
  name = 'name',
  description = 'description',
  location = 'location',
  realEstateCore = 'realEstateCore',
  contextualParameters = 'contextualParameters'
}

const PROGRESS_BAR_TITLES: Record<STEPS, string> = {
  [STEPS.searchDevice]: 'Search device',
  [STEPS.selectParameters]: 'Select parameters',
  [STEPS.finished]: 'Finish',
  [STEPS.name]: 'Update name',
  [STEPS.description]: 'Update description',
  [STEPS.location]: 'Add location',
  [STEPS.realEstateCore]: 'Update real estate core',
  [STEPS.contextualParameters]: 'Update contextual parameters',
};

export {
  STEPS,
  PROGRESS_BAR_TITLES,
};
