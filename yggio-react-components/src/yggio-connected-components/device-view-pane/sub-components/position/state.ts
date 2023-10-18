/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {InputValue} from '../../../../types';
import {generateForm, VALIDATION_VISIBILITY_TYPES, inputValidators} from '../../../../utils/form-wizard';

const positionForm = {
  latitude: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Latitude is required'),
        {
          validate: (value: InputValue) => !Number.isNaN(Number(value)),
          message: 'Must be a number',
        }
      ],
    }
  },
  longitude: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Longitude is required'),
        {
          validate: (value: InputValue) => !Number.isNaN(Number(value)),
          message: 'Must be a number',
        }
      ],
    }
  },
};

const positionFormState = generateForm(positionForm);

export default positionFormState;
