/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {generateForm, VALIDATION_VISIBILITY_TYPES, inputValidators} from '../../../../utils/form-wizard';

const formConfig = {
  name: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Name cannot be empty'),
        inputValidators.maximumLength(150),
      ]
    },
  },
  description: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.maximumLength(2000),
      ]
    },
  },
  deviceModelName: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
};

const formState = generateForm(formConfig);

export default formState;
