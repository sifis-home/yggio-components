import _ from 'lodash';

import {validateConfig} from './config-validator';
import {
  actions,
  createReducer,
  ACTION_TYPES,
  VALIDATION_VISIBILITY_TYPES,
  validateInputValue,
} from './state';
import {FormConfig} from '../../types';

const createDefaultState = (config: FormConfig) => {
  const defaultFormInputs = _.mapValues(config, inputConfig => {
    const {isValid, message} = validateInputValue(inputConfig, inputConfig.defaultValue);
    return {
      value: inputConfig.defaultValue,
      validation: {
        message,
        isValid,
        isVisible: false,
      }
    };
  });
  return {
    formInputs: defaultFormInputs,
    isPopulated: false,
  };
};

const generateForm = (config: FormConfig) => {
  validateConfig(config);
  const defaultState = createDefaultState(config);
  const reducer = createReducer(config, defaultState);
  return {
    actions,
    reducer,
    actionTypes: ACTION_TYPES,
  };
};

export {
  generateForm,
  VALIDATION_VISIBILITY_TYPES,
};
