import {
  generateForm,
  inputValidators,
  VALIDATION_VISIBILITY_TYPES,
} from '../../../../../utils/form-wizard';
import {InputValue} from '../../../../../types';

const regex = /^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/;

const formConfig = {
  connector: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please select a BLE connector'),
      ],
    }
  },
  macAddress: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a BLE mac address'),
        {
          validate: (value: InputValue) => {
            return !!regex.test(value as string);
          },
          message: 'Must be a valid MAC address',
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
