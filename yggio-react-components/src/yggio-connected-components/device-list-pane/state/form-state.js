/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {PropTypes, checkProps} from 'vanilla-prop-types';

import {
  generateForm,
  VALIDATION_VISIBILITY_TYPES,
  getVanillaPropTypesInputsShape,
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
};

const inputsProps = {
  filterName: PropTypes.string,
  filterDeviceModelName: PropTypes.string,
  filterType: PropTypes.string,
  filterDevEui: PropTypes.string,
};

const propTypes = getVanillaPropTypesInputsShape(inputsProps);

const validateState = checkProps(propTypes, {isExact: true});

const {actions, reducer} = generateForm(formData);

export default {
  actions,
  reducer,
  validateState,
};
