import {
  generateForm,
  inputValidators,
  VALIDATION_VISIBILITY_TYPES,
} from '../../utils/form-wizard';
import {FormConfig} from '../../types';

const formConfig: FormConfig = {
  name: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a name'),
        inputValidators.nonEmptyTrimmedString('Cannot only contain whitespace'),
      ]
    }
  },
  value: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a value'),
        inputValidators.nonEmptyTrimmedString('Cannot only contain whitespace'),
      ]
    }
  },
};

const {actions, reducer} = generateForm(formConfig);

export default {
  actions,
  reducer,
};
