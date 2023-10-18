import {
  generateForm,
  VALIDATION_VISIBILITY_TYPES,
} from '../../../../utils/form-wizard';

const toolsConfig = {
  setConnectorId: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
};

const formState = generateForm(toolsConfig);

export {
  formState,
};
