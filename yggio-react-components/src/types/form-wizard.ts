import {VALIDATION_VISIBILITY_TYPES} from '../utils/form-wizard';

interface Validation {
  message: string | null,
  isValid: boolean,
  isVisible: boolean | undefined,
}

type InputValue = string | number | object | boolean | string[];

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

interface ValidatorObject {
  validate: (value: InputValue, formInputs?: FormInputs) => boolean;
  message: string | ((value: InputValue) => string);
}

type ValidatorFunction = (value: InputValue, formInputs?: FormInputs) => void;

type Validator = ValidatorObject | ValidatorFunction;

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

export type {
  Validation,
  Validator,
  Form,
  FormInput,
  FormInputs,
  InputConfig,
  FormConfig,
  InputValue,
};
