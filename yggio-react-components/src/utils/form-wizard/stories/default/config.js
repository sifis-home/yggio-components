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

const devEuiPattern = /^[A-Z0-9]{16}$/;
const appKeyPattern = /^[A-Z0-9]{32}$/;

const conf = {
  connector: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validMessage: 'Valid',
      validators: [
        inputValidators.inputRequired('Please select a connector'),
      ],
    }
  },
  devEui: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validMessage: 'Valid',
      validators: [
        inputValidators.inputRequired('Please enter a DevEUI'),
        {
          validate: value => devEuiPattern.test(value),
          message: 'Must be 16 characters, numbers and uppercase letters only',
        }
      ],
    }
  },
  appKey: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validMessage: 'Valid',
      validators: [
        inputValidators.inputRequired('Please enter a AppKey'),
        {
          validate: value => appKeyPattern.test(value),
          message: 'Must be 32 characters, numbers and uppercase letters only',
        }
      ],
    }
  }
};

export default conf;
