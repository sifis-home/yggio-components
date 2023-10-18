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
  chirpstackUrl: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a Chirp Stack URL'),
        inputValidators.maximumLength(255),
      ],
    }
  },
  applicationId: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter an Application ID'),
        inputValidators.maximumLength(2),
      ],
    }
  },
  username: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a Username'),
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
  organizationId: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter an Organization ID'),
        inputValidators.maximumLength(4),
      ],
    }
  },
  networkServerId: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a Network Server ID'),
        inputValidators.maximumLength(4),
      ],
    }
  },
  deviceProfileIdsAbp: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a Device Profile IDs APB'),
        inputValidators.maximumLength(36),
      ],
    }
  },
  deviceProfileIdsOtaa: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a Device Profile IDs OTAA'),
        inputValidators.maximumLength(36),
      ],
    }
  },
};


const {actions, reducer} = generateForm(formConfig);

export default {
  actions,
  reducer,
};
