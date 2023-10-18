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

const formConfig = {
  secret: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a secret'),
        inputValidators.minimumLength(8),
        inputValidators.maximumLength(128),
        {
          validate: (value: InputValue) => {
            const pattern = /^[a-zA-Z0-9\-_/.]+$/;
            return pattern.test(value as string);
          },
          message: 'Can only include letters, numbers, dash, slashes, underline, dot',
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
