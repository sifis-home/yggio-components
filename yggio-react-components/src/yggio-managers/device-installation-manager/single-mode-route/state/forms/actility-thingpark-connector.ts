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
  thingparkUrl: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter an Actility Thingpark Connector URL'),
        inputValidators.maximumLength(64),
      ],
    }
  },
  targetProfileIdentifier: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a Target Profile Identifier'),
        inputValidators.maximumLength(64),
      ],
    }
  },
  loginEmail: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a Login Email'),
        inputValidators.maximumLength(64),
      ],
    }
  },
  password: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a Password'),
        inputValidators.maximumLength(64),
      ],
    }
  },
};


const {actions, reducer} = generateForm(formConfig);

export default {
  actions,
  reducer,
};
