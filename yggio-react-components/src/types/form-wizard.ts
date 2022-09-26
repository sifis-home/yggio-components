/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {VALIDATION_VISIBILITY_TYPES} from '../utils/form-wizard';

interface Validation {
  message: string | null,
  isValid: boolean,
  isVisible: boolean | undefined,
}

type InputValue = string | number | object | boolean;

interface FormInput {
  validation: Validation,
  value: InputValue,
}

type FormInputs = {[name: string]: FormInput};

interface Form {
  formInputs: FormInputs;
  setInputValue: (inputName: string, value: InputValue) => void;
  showInputValidation: (inputName: string) => void;
  hideInputValidation: (inputName: string) => void;
  showAllInputValidations: () => void;
  hideAllInputValidations: () => void;
  populateInputValues: (inputs: {[inputName: string]: InputValue}) => void;
  resetForm: () => void;
}

interface Validator {
  validate: (value: InputValue, formInputs?: FormInputs) => boolean;
  message: string | ((value: InputValue) => string);
}

interface InputConfig {
  defaultValue: InputValue,
  validation: {
    visibilityType: VALIDATION_VISIBILITY_TYPES;
    validMessage?: string;
    validators?: Validator[];
  }
}

interface FormConfig {
  [inputName: string]: InputConfig;
}

export {
  Validation,
  Validator,
  Form,
  FormInput,
  FormInputs,
  InputConfig,
  FormConfig,
  InputValue,
};
