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
  urlRegex: {
    pattern: /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/,
    message: 'Invalid URL - Please enter a valid URL'
  },
};

const formConfig = {
  box2GatewayUrl: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a URL'),
        {
          validate: (value: InputValue) => patterns.urlRegex.pattern.test(value as string),
          message: patterns.urlRegex.message,
        }
      ],
    }
  },
  username: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a Box2 Gateway Username'),
      ],
    }
  },
  password: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a Box2 Gateway Password'),
      ],
    }
  },
};

const {actions, reducer} = generateForm(formConfig);

export default {
  actions,
  reducer,
};
