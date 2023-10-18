import {
  generateForm,
  inputValidators,
  VALIDATION_VISIBILITY_TYPES,
} from '../../../../../utils/form-wizard';

const formConfig = {
  sodaqImei: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        inputValidators.inputRequired('Please enter a Sodaq IMEI'),
      ],
    }
  },
};


const {actions, reducer} = generateForm(formConfig);


export default {
  actions,
  reducer,
};
