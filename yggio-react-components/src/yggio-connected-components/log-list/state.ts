/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {generateForm, VALIDATION_VISIBILITY_TYPES} from '../../utils/form-wizard';
import {FormConfig} from '../../types';

const formConfig: FormConfig = {
  typeFilter: {
    defaultValue: [],
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
  priorityFilter: {
    defaultValue: [],
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
  categoryFilter: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
  messageFilter: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
  verifiedFilter: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
};

const {actions, reducer} = generateForm(formConfig);

export default {
  actions,
  reducer,
};
