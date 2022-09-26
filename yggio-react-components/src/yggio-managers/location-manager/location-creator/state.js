/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {PropTypes, checkProps} from 'vanilla-prop-types';
import _ from 'lodash';
import {
  generateForm,
  VALIDATION_VISIBILITY_TYPES,
  getVanillaPropTypesInputsShape,
} from '../../../utils/form-wizard';

const formData = {
  name: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [{
        validate: value => !!value,
        message: 'Please enter a valid name',
      }],
    }
  },
  desc: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [{
        validate: value => !!value,
        message: 'Please enter a valid description',
      }],
    }
  },
  lat: {
    defaultValue: 0,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [{
        validate: val => (_.isNumber(val) && val >= -90 && val <= 90),
        message: 'Please enter a valid latitude value (between -90 and 90)',
      }],
    }
  },
  lng: {
    defaultValue: 0,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [{
        validate: val => (_.isNumber(val) && val >= -180 && val <= 180),
        message: 'Please enter a valid longitude value (between -180 and 180)',
      }],
    }
  },
};

const inputsProps = {
  name: PropTypes.string,
  desc: PropTypes.string,
  lat: PropTypes.number,
  lng: PropTypes.number,
};

const propTypes = getVanillaPropTypesInputsShape(inputsProps);

const validateState = checkProps(propTypes, {isExact: true});

const {actions, reducer} = generateForm(formData);

export default {
  actions,
  reducer,
  validateState,
};
