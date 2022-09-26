/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// form-wizard/config-validator.js

import _ from 'lodash';

import {VALIDATION_VISIBILITY_TYPES} from './state/constants';
import {FormConfig, InputConfig, Validator} from '../../types';

const PREFIX = 'generateForm dev error:';

const validateConfig = (data: FormConfig) => {
  if (!_.isPlainObject(data)) {
    throwError(`config must be an object`);
  }
  if (!_.size(data)) {
    throwError(`config must not be an empty object`);
  }
  _.each(data, (inputConfig, inputName) => (
    validateInputConfig(inputConfig, inputName)
  ));
};

const validateInputConfig = (inputConfig: InputConfig, inputName: string) => {
  if (!_.isPlainObject(inputConfig)) {
    throwError(`${inputName} must be an object`);
  }
  if (_.isNil(inputConfig.validation)) {
    throwError(`${inputName}.validation must be included`);
  }
  const {
    defaultValue,
    validation: {
      visibilityType,
      validMessage,
      validators,
    },
  } = inputConfig;
  if (_.isNil(defaultValue)) {
    throwError(`${inputName}.defaultValue must be included`);
  }
  if (_.isNil(visibilityType)) {
    throwError(`${inputName}.validation.visibilityType must be included`);
  }
  if (!VALIDATION_VISIBILITY_TYPES[visibilityType]) {
    throwError(`${inputName}.validation.visibilityType (${visibilityType}) must be one of: ${_.map(VALIDATION_VISIBILITY_TYPES)}`);
  }
  if (!_.isNil(validMessage) && !_.isString(validMessage)) {
    throwError(`${inputName}.validation.validMessage must be a string`);
  }
  if (!_.isNil(validators)) {
    if (!_.isArray(validators)) {
      throwError(`${inputName}.validation.validators must be an array`);
    }
    _.each(validators, (validator, i) => (
      validateInputValidator(validator, `${inputName}.validation.validators[${i}]`)
    ));
  }
};

const validateInputValidator = (validator: Validator, validatorPrefix: string) => {
  if (!_.isPlainObject(validator) && !_.isFunction(validator)) {
    throwError(`${validatorPrefix} must be an object or function`);
  }
  if (_.isFunction(validator)) {
    return;
  }
  if (_.isNil(validator.validate)) {
    throwError(`${validatorPrefix} must have a validate property`);
  }
  if (!_.isFunction(validator.validate)) {
    throwError(`${validatorPrefix} validate must be a function`);
  }
  if (_.isNil(validator.message)) {
    throwError(`${validatorPrefix} must have a message property`);
  }
  if (!_.isString(validator.message) && !_.isFunction(validator.message)) {
    throwError(`${validatorPrefix} message must be a string or a function`);
  }
};

const throwError = (message: string) => {
  throw new Error(`${PREFIX} ${message}`);
};

export {
  validateConfig,
};
