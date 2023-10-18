import {
  generateForm,
  VALIDATION_VISIBILITY_TYPES,
  inputValidators,
} from '../../../../utils/form-wizard';

const formConfig = {
  name: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a name'),
      ],
    },
  },
  description: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
};

const formState = generateForm(formConfig);

export default formState;
