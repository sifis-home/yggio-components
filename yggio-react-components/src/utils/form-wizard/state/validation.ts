import _ from 'lodash';

import {
  ACTION_TYPES,
  VALIDATION_VISIBILITY_TYPES
} from './constants';
import {InputConfig, FormInputs, InputValue} from '../../../types';

const shouldBeVisible = (
  visibilityType: VALIDATION_VISIBILITY_TYPES,
  actionType: ACTION_TYPES,
  isVisible?: boolean,
) => {

  switch (actionType) {

    case ACTION_TYPES.setInputValue: {
      switch (visibilityType) {
        case VALIDATION_VISIBILITY_TYPES.always: return true;
        case VALIDATION_VISIBILITY_TYPES.never: return false;
        case VALIDATION_VISIBILITY_TYPES.optIn: return false;
        case VALIDATION_VISIBILITY_TYPES.manual: return isVisible;
        default: return true;
      }
    }

    case ACTION_TYPES.showInputValidation: {
      switch (visibilityType) {
        case VALIDATION_VISIBILITY_TYPES.always: return true;
        case VALIDATION_VISIBILITY_TYPES.never: return false;
        case VALIDATION_VISIBILITY_TYPES.optIn: return true;
        case VALIDATION_VISIBILITY_TYPES.manual: return true;
        default: return true;
      }
    }

    case ACTION_TYPES.hideInputValidation: {
      switch (visibilityType) {
        case VALIDATION_VISIBILITY_TYPES.always: return true;
        case VALIDATION_VISIBILITY_TYPES.never: return false;
        case VALIDATION_VISIBILITY_TYPES.optIn: return false;
        case VALIDATION_VISIBILITY_TYPES.manual: return false;
        default: return true;
      }
    }

    default: return true;
  }
};


const validateInputValue = (
  inputConfig: InputConfig,
  value: InputValue,
  formInputs?: FormInputs,
) => {
  const validators = inputConfig.validation.validators || [];
  let isValid = true;
  let validationMessage = null;
  _.forEach(validators, validator => {
    // Object validator
    if (typeof validator === 'object') {
      const valid = validator.validate(value, formInputs);
      if (!valid) {
        isValid = false;
        const {message} = validator;
        if (_.isFunction(message)) {
          validationMessage = message(value);
        } else {
          validationMessage = message;
        }
      }
    }
    // Function validator
    if (typeof validator === 'function') {
      try {
        validator(value, formInputs);
      } catch (error: unknown) {
        isValid = false;
        if (error instanceof Error) {
          validationMessage = error.message;
        }
      }
    }
    // No need to do more validation if false
    if (!isValid) {
      return false;
    }
  });

  // Optional valid message
  const {validMessage} = inputConfig.validation;
  if (isValid && !!validMessage) {
    validationMessage = validMessage;
  }

  return {
    isValid,
    message: validationMessage,
  };
};

export {
  validateInputValue,
  shouldBeVisible,
  VALIDATION_VISIBILITY_TYPES,
};
