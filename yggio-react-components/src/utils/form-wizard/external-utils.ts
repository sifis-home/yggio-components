/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import PropTypes from 'prop-types';
// @ts-ignore because we will stop using this package soon
import {PropTypes as VanillaPropTypes} from 'vanilla-prop-types';

import {FormInputs, Form, Validation} from '../../types';
import {ACTION_TYPES} from './state';

const getValidationErrorMessage = ({validation: v}: {validation: Validation}) => (
  !v.isValid && v.isVisible ? v.message : null
);

const getValidationSuccessMessage = ({validation: v}: {validation: Validation}) => (
  v.isValid && v.isVisible ? v.message : null
);

const isFormValid = (formInputs: FormInputs) => (
  _.every(formInputs, 'validation.isValid')
);

const getFormValues = (formInputs: FormInputs) => (
  _.mapValues(formInputs, ({value}) => value)
);

const getFormShape = (inputs: {[inputName: string]: PropTypes.Validator<unknown>}) => {
  if (!_.isPlainObject(inputs)) {
    throw new Error('DevErr: inputs should be key-value pairs e.g. {name: PropTypes.string}');
  }
  const formInputsShape = PropTypes.shape(_.mapValues(inputs, propType => {
    return PropTypes.shape({
      value: propType,
      validation: PropTypes.shape({
        message: PropTypes.string,
        isValid: PropTypes.bool.isRequired,
        isVisible: PropTypes.bool.isRequired,
      })
    });
  }));
  const actionsShapes = _.mapValues(ACTION_TYPES, () => PropTypes.func.isRequired);
  return {
    formInputs: formInputsShape,
    isPopulated: PropTypes.bool,
    ...actionsShapes,
  };
};


const generateHandleValueChange = (
  props: Form,
  show: boolean,
) => (evt: React.ChangeEvent<HTMLInputElement>) => {
  const {target: {value, name}} = evt;
  props.setInputValue(name, value);
  if (show) {
    props.showInputValidation(name);
  }
};

const generateShowInputValidation = (
  props: Form,
) => (evt: React.ChangeEvent<HTMLInputElement>) => {
  const {target: {name}} = evt;
  props.showInputValidation(name);
};

// ignoring since we will stop using this package soon
/* eslint-disable */
const getVanillaPropTypesInputsShape = (inputs: {[inputName: string]: any}) => {
  if (!_.isPlainObject(inputs)) {
    throw new Error('DevErr: inputs should be key-value pairs e.g. {name: PropTypes.string}');
  }
  const formInputsShape = VanillaPropTypes.shape(_.mapValues(inputs, (propType) => {
    return VanillaPropTypes.shape({
      value: propType.isRequired,
      validation: VanillaPropTypes.shape({
        message: VanillaPropTypes.string.isRequiredOrNull,
        isValid: VanillaPropTypes.bool.isRequired,
        isVisible: VanillaPropTypes.bool.isRequired,
      }, {isExact: true}).isRequired,
    }, {isExact: true}).isRequired;
  }), {isExact: true});
  const shape = {
    formInputs: formInputsShape.isRequired,
    isPopulated: VanillaPropTypes.bool.isRequired,
  };
  return shape;
};
/* eslint-enable */

export {
  getValidationErrorMessage,
  getValidationSuccessMessage,
  isFormValid,
  getFormValues,
  getFormShape,
  getVanillaPropTypesInputsShape,
  generateHandleValueChange,
  generateShowInputValidation,
};
