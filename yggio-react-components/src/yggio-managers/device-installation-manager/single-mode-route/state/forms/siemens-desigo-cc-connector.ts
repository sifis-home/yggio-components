import {
  generateForm,
  inputValidators,
  VALIDATION_VISIBILITY_TYPES,
} from '../../../../../utils/form-wizard';
import {InputValue} from '../../../../../types';


const patterns = {
  urlRegex: {
    pattern: /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/,
    message: 'Invalid URL - Please enter a valid URL'
  },
};

const formConfig = {
  url: {
    defaultValue: 'https://example/api/',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a URL'),
        {
          validate: (value: InputValue) => patterns.urlRegex.pattern.test(value as string),
          message: patterns.urlRegex.message,
        }
      ],
    }
  },
  username: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a Username'),
        inputValidators.maximumLength(64),
      ],
    }
  },
  password: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a Password'),
        inputValidators.maximumLength(64),
      ],
    }
  },
};
const {actions, reducer} = generateForm(formConfig);

export default {
  actions,
  reducer,
};
