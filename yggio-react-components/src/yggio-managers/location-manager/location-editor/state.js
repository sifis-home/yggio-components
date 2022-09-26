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
  getVanillaPropTypesInputsShape,
  VALIDATION_VISIBILITY_TYPES
} from '../../../utils/form-wizard';

const formConfig = {
  name: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  description: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
};

const inputsProps = {
  name: PropTypes.string,
  description: PropTypes.string,
};

const propTypes = getVanillaPropTypesInputsShape(inputsProps);

const validateState = checkProps(propTypes, {isExact: true});

const {actions, reducer} = generateForm(formConfig);

export default {
  actions,
  reducer,
  validateState,
};