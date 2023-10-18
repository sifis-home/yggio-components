/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {
  generateForm,
  VALIDATION_VISIBILITY_TYPES,
} from './generate-form';
import inputValidators from './lib/input-validators';
import {
  getValidationErrorMessage,
  getValidationSuccessMessage,
  isFormValid,
  getFormValues,
  getFormShape,
  getVanillaPropTypesInputsShape,
  generateHandleValueChange,
  generateShowInputValidation,
} from './external-utils';

export {
  generateForm,
  // used for form-config
  VALIDATION_VISIBILITY_TYPES,
  inputValidators,
  // utils
  getValidationErrorMessage,
  getValidationSuccessMessage,
  isFormValid,
  getFormValues,
  getFormShape,
  getVanillaPropTypesInputsShape,
  generateHandleValueChange,
  generateShowInputValidation,
};
