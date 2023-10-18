import {
  generateForm,
  inputValidators,
  VALIDATION_VISIBILITY_TYPES,
} from '../../../../../utils/form-wizard';
import {InputValue} from '../../../../../types';


const patterns = {
  hex8: {
    pattern: /^[0-9]{8}$/,
    message: 'Must be 8 characters, and only numbers',
  },
  hex32: {
    pattern: /^[0-9]{32}$/,
    message: 'Must be 32 characters, and only numbers',
  },
};
const formConfig = {
  manufacturer: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a manufacturer'),
        inputValidators.maximumLength(64),
      ],
    }
  },
  wMbusDeviceId: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a Device ID'),
        {
          validate: (value: InputValue) => patterns.hex8.pattern.test(value as string),
          message: patterns.hex8.message,
        }
      ],
    }
  },
  encryptionKey: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a Device ID'),
        {
          validate: (value: InputValue) => patterns.hex32.pattern.test(value as string),
          message: patterns.hex32.message,
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
