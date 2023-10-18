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

const formConfig = {
  apiToken: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a Token'),
      ],
    }
  },
  countryCode: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a Country Code'),
        inputValidators.maximumLength(3),
      ],
    }
  },
  districtId: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a District ID'),
        inputValidators.maximumLength(10),
      ],
    }
  },
};


const {actions, reducer} = generateForm(formConfig);

export default {
  actions,
  reducer,
};
