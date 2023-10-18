import {InputValue} from '../../../../types';
import {generateForm, VALIDATION_VISIBILITY_TYPES, inputValidators} from '../../../../utils/form-wizard';

const positionForm = {
  latitude: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Latitude is required'),
        {
          validate: (value: InputValue) => !Number.isNaN(Number(value)),
          message: 'Must be a number',
        }
      ],
    }
  },
  longitude: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        inputValidators.inputRequired('Longitude is required'),
        {
          validate: (value: InputValue) => !Number.isNaN(Number(value)),
          message: 'Must be a number',
        }
      ],
    }
  },
};

const positionFormState = generateForm(positionForm);

export default positionFormState;
