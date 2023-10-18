/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {
  generateForm,
  inputValidators,
  VALIDATION_VISIBILITY_TYPES,
} from '../../../../../utils/form-wizard';
import {InputValue} from '../../../../../types';


const patterns = {
  hex8: {
    pattern: /^[0-9]{8}$/,
    message: 'Must be 8 characters, and only numbers',
  },
  hex32: {
    pattern: /^[0-9]{32}$/,
    message: 'Must be 32 characters, and only numbers',
  },
};
const formConfig = {
  manufacturer: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a manufacturer'),
        inputValidators.maximumLength(64),
      ],
    }
  },
  wMbusDeviceId: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a Device ID'),
        {
          validate: (value: InputValue) => patterns.hex8.pattern.test(value as string),
          message: patterns.hex8.message,
        }
      ],
    }
  },
  encryptionKey: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a Device ID'),
        {
          validate: (value: InputValue) => patterns.hex32.pattern.test(value as string),
          message: patterns.hex32.message,
        }
      ],
    }
  },
};


const {actions, reducer} = generateForm(formConfig);

export default {
  actions,
  reducer,
};
