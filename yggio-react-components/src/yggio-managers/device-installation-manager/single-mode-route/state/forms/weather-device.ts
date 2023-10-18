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
  connector: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please select a Weather connector'),
      ],
    }
  },
};


const {actions, reducer} = generateForm(formConfig);


export default {
  actions,
  reducer,
};
