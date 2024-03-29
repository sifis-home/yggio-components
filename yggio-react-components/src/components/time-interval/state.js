﻿/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {generateForm, VALIDATION_VISIBILITY_TYPES, inputValidators} from '../../utils/form-wizard';

const formConfig = {
  hours: {
    defaultValue: 0,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
      validators: [
        inputValidators.inputRequired(''),
        {
          validate: value => {
            if (Number.isNaN(value)) {
              console.info('it is false 1');
              return false;
            }
            if (value < 0 || value > 59) {
              console.info('it is false 2');
              return false;
            }
            console.info('it is true');
            return true;
          },
          message: 'Please enter a valid contextMap key',
        },
      ]
    }
  },
  minutes: {
    defaultValue: 0,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
      validators: [
        inputValidators.inputRequired(''),
        {
          validate: value => {
            if (Number.isNaN(value)) {
              console.info('it is false 1');
              return false;
            }
            if (value < 0 || value > 59) {
              console.info('it is false 2');
              return false;
            }
            console.info('it is true');
            return true;
          },
          message: 'Please enter a valid contextMap key',
        },
      ]
    }
  },
  seconds: {
    defaultValue: 0,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
      validators: [
        inputValidators.inputRequired(''),
        {
          validate: value => {
            if (Number.isNaN(value)) {
              console.info('it is false 1');
              return false;
            }
            if (value < 0 || value > 59) {
              console.info('it is false 2');
              return false;
            }
            console.info('it is true');
            return true;
          },
          message: 'Please enter a valid contextMap key',
        },
      ]
    }
  },
};

const formState = generateForm(formConfig);

export {
  formState,
};
