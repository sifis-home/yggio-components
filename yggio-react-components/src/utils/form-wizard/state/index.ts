/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';

import {
  shouldBeVisible,
  validateInputValue,
} from './validation';
import {FormInput, FormConfig, FormInputs, InputValue} from '../../../types';
import {
  ACTION_TYPES,
  VALIDATION_VISIBILITY_TYPES
} from './constants';

interface DispatchParams {
  type: string;
  payload?: {
    inputName?: string,
    value?: InputValue,
    newInputs?: {[inputName: string]: InputValue},
  };
}
type Dispatch = (obj: DispatchParams) => void;

const actions = {
  setInputValue: (
    inputName: string,
    value: InputValue,
  ) => (dispatch: Dispatch) => dispatch({
    type: ACTION_TYPES.setInputValue,
    payload: {inputName, value},
  }),
  showInputValidation: (inputName: string) => (dispatch: Dispatch) => dispatch({
    type: ACTION_TYPES.showInputValidation,
    payload: {inputName},
  }),
  hideInputValidation: (inputName: string) => (dispatch: Dispatch) => dispatch({
    type: ACTION_TYPES.hideInputValidation,
    payload: {inputName},
  }),
  showAllInputValidations: () => (dispatch: Dispatch) => dispatch({
    type: ACTION_TYPES.showAllInputValidations,
  }),
  hideAllInputValidations: () => (dispatch: Dispatch) => dispatch({
    type: ACTION_TYPES.hideAllInputValidations,
  }),
  populateInputValues: (
    newInputs: {[inputName: string]: InputValue}
  ) => (dispatch: Dispatch) => dispatch({
    type: ACTION_TYPES.populateInputValues,
    payload: {newInputs},
  }),
  resetForm: () => (dispatch: Dispatch) => dispatch({
    type: ACTION_TYPES.resetForm,
  }),
};

const changeFormInputVisibility = (
  formInputState: FormInput,
  visibilityType: VALIDATION_VISIBILITY_TYPES,
  actionType: ACTION_TYPES,
) => {
  const isVisible = shouldBeVisible(
    visibilityType,
    actionType
  );
  return {
    ...formInputState,
    validation: {
      ...formInputState.validation,
      isVisible,
    }
  };
};

interface DefaultState {
  formInputs: FormInputs;
  isPopulated: boolean;
}

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const createReducer = (
  config: FormConfig,
  defaultState: DefaultState,
) => (state = defaultState, action: DispatchParams) => {
  const {type, payload} = action;

  switch (type) {

    case ACTION_TYPES.setInputValue: {
      const inputName = payload!.inputName!;
      const value = payload!.value!;
      const {
        isValid,
        message
      } = validateInputValue(config[inputName], value, state.formInputs);
      const isVisible = shouldBeVisible(
        config[inputName].validation.visibilityType,
        ACTION_TYPES.setInputValue,
        state.formInputs[inputName].validation.isVisible
      );
      return {
        ...state,
        formInputs: {
          ...state.formInputs,
          [inputName]: {
            ...state.formInputs[inputName],
            value,
            validation: {
              ...state.formInputs[inputName].validation,
              message,
              isValid,
              isVisible,
            }
          }
        }
      };
    }

    case ACTION_TYPES.showInputValidation: {
      const inputName = payload!.inputName!;

      const inputStateShown = changeFormInputVisibility(
        state.formInputs[inputName],
        config[inputName].validation.visibilityType,
        ACTION_TYPES.showInputValidation
      );

      return {
        ...state,
        formInputs: {
          ...state.formInputs,
          [inputName]: {
            ...inputStateShown,
          }
        }
      };
    }

    case ACTION_TYPES.hideInputValidation: {
      const inputName = payload!.inputName!;

      const inputStateHidden = changeFormInputVisibility(
        state.formInputs[inputName],
        config[inputName].validation.visibilityType,
        ACTION_TYPES.hideInputValidation
      );

      return {
        ...state,
        formInputs: {
          ...state.formInputs,
          [inputName]: {
            ...inputStateHidden,
          }
        }
      };
    }

    case ACTION_TYPES.showAllInputValidations: {
      const newFormInputs = _.mapValues(state.formInputs, (input, inputName) => {
        return changeFormInputVisibility(
          input,
          config[inputName].validation.visibilityType,
          ACTION_TYPES.showInputValidation
        );
      });

      return {
        ...state,
        formInputs: {
          ...newFormInputs,
        }
      };
    }

    case ACTION_TYPES.hideAllInputValidations: {
      const newFormInputs = _.mapValues(state.formInputs, (input, inputName) => {
        return changeFormInputVisibility(
          input,
          config[inputName].validation.visibilityType,
          ACTION_TYPES.hideInputValidation
        );
      });
      return {
        ...state,
        formInputs: {
          ...newFormInputs,
        }
      };
    }

    case ACTION_TYPES.populateInputValues: {
      const newInputs = payload!.newInputs!;
      const newFormInputs = _.mapValues(newInputs, (newInputVal, newInputName) => {
        const {
          isValid,
          message,
        } = validateInputValue(config[newInputName], newInputVal, state.formInputs);
        return {
          value: newInputVal,
          validation: {
            message,
            isValid,
            isVisible: !isValid,
          }
        };
      });
      return {
        ...state,
        formInputs: newFormInputs,
        isPopulated: true,
      };
    }

    case ACTION_TYPES.resetForm: {
      return defaultState;
    }

    default: {
      return state;
    }

  }
};

export {
  actions,
  createReducer,
  ACTION_TYPES,
  VALIDATION_VISIBILITY_TYPES,
  validateInputValue,
};
