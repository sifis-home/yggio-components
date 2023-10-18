import {generateForm, VALIDATION_VISIBILITY_TYPES} from '../../utils/form-wizard';
import {FormConfig} from '../../types';

const formConfig: FormConfig = {
  typeFilter: {
    defaultValue: [],
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
  priorityFilter: {
    defaultValue: [],
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
  categoryFilter: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
  messageFilter: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
  verifiedFilter: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
};

const {actions, reducer} = generateForm(formConfig);

export default {
  actions,
  reducer,
};
