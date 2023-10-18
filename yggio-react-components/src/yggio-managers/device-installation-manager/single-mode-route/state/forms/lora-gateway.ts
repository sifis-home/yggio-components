import {
  generateForm,
  inputValidators,
  VALIDATION_VISIBILITY_TYPES,
} from '../../../../../utils/form-wizard';
import {InputValue} from '../../../../../types';


const patterns = {
  hex16: {
    pattern: /^[A-F0-9]{16}$/,
    message: 'Must be 16 characters, numbers and A-F letters only',
  },
};

const formConfig = {
  connector: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
    }
  },
  loraGatewayDevEui: {
    defaultValue: '',
    validation: {
      validMessage: `Valid`,
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Please enter a DevEUI'),
        {
          validate: (value: InputValue) => patterns.hex16.pattern.test(value as string),
          message: patterns.hex16.message,
        }
      ],
    }
  },
};

const {actions, reducer} = generateForm(formConfig);

export default {
  actions,
  reducer,
};
