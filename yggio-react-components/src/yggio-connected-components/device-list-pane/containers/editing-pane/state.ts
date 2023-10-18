/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {generateForm, VALIDATION_VISIBILITY_TYPES, inputValidators} from '../../../../utils/form-wizard';
import {FormConfig} from '../../../../types';

const editConfig: FormConfig = {
  contextMapKey: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a key'),
        {
          validate: value => {
            const alphanumericPattern = /^[a-zA-Z0-9]*$/; // only alphanumeric
            return alphanumericPattern.test(value as string);
          },
          message: 'Key must be alphanumeric',
        },
      ],
    }
  },
  contextMapValue: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a value'),
      ]
    }
  },
  contextMap: {
    defaultValue: {},
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: []
    }
  },
  description: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
};

const editState = generateForm(editConfig);

export {
  editState,
};
