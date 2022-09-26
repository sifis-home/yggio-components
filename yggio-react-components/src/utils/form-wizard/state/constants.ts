/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
enum ACTION_TYPES {
  setInputValue = 'setInputValue',
  showInputValidation = 'showInputValidation',
  hideInputValidation = 'hideInputValidation',
  showAllInputValidations = 'showAllInputValidations',
  hideAllInputValidations = 'hideAllInputValidations',
  populateInputValues = 'populateInputValues',
  resetForm = 'resetForm',
}


enum VALIDATION_VISIBILITY_TYPES {
  always,
  never,
  optIn,
  manual,
}

export {
  ACTION_TYPES,
  VALIDATION_VISIBILITY_TYPES,
};
