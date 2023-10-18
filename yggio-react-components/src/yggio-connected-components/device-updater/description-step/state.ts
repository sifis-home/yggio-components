
import {
  generateForm,
  VALIDATION_VISIBILITY_TYPES,
  inputValidators,
} from '../../../utils/form-wizard';

const formStateData = {
  description: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a description'),
      ],
    }
  },
};

const formStateOptions = generateForm(formStateData);

export default formStateOptions;
