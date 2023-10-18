import {generateForm, VALIDATION_VISIBILITY_TYPES} from '../../utils/form-wizard';

const chartsConfig = {
  field1: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  field2: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
};

const chartsState = generateForm(chartsConfig);

export {
  chartsState,
};
