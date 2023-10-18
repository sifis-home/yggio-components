/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {generateForm, VALIDATION_VISIBILITY_TYPES, inputValidators} from '../../../../utils/form-wizard';

const formConfig = {
  connectorId: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
    },
  },
  subTopic: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
    },
  },
  dataType: {
    defaultValue: 'none',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.never,
    },
  },
  rawData: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Please enter raw data'),
      ],
    },
  },
  jsonData: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.validJson,
      ],
      validMessage: 'Valid JSON',
    },
  },
};

const formState = generateForm(formConfig);

export default formState;
