/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {
  generateForm,
  VALIDATION_VISIBILITY_TYPES,
} from '../../../utils/form-wizard';

const formData = {
  filterName: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  filterDeviceModelName: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  filterType: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  filterDevEui: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  filterConnector: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  filterContextualParameterKey: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  filterContextualParameterValue: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  filterQ: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
};
const {actions, reducer} = generateForm(formData);

export default {
  actions,
  reducer,
};
