/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// form-wizard/default/config.js

import {
  VALIDATION_VISIBILITY_TYPES,
  inputValidators,
} from '../../index';

const conf = {
  always: {
    defaultValue: '',
    validation: {
      validMessage: 'Valid',
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Please type one letter'),
        inputValidators.maximumLength(1),
      ],
    }
  },
  never: {
    defaultValue: '',
    validation: {
      validMessage: 'Valid',
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
      validators: [
        inputValidators.inputRequired('Please type one letter'),
        inputValidators.maximumLength(1),
      ],
    }
  },
  optIn: {
    defaultValue: '',
    validation: {
      validMessage: 'Valid',
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please type one letter'),
        inputValidators.maximumLength(1),
      ],
    }
  },
  manual: {
    defaultValue: '',
    validation: {
      validMessage: 'Valid',
      visibilityType: VALIDATION_VISIBILITY_TYPES.manual,
      validators: [
        inputValidators.inputRequired('Please type one letter'),
        inputValidators.maximumLength(1),
      ],
    }
  },
};

export default conf;
