import {InputValue} from '../../../types';
import {
  generateForm,
  VALIDATION_VISIBILITY_TYPES,
} from '../../../utils/form-wizard';

const formData = {
  name: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [{
        validate: (value: InputValue) => (
          (value as string).length > 0 && (value as string).length < 50
        ),
        message: 'Name must be between 1 and 50 characters',
      }],
    }
  },
};
const {actions, reducer} = generateForm(formData);

export default {
  actions,
  reducer,
};
