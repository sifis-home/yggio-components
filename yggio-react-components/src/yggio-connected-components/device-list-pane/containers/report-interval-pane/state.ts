import {generateForm, VALIDATION_VISIBILITY_TYPES} from '../../../../utils/form-wizard';

const reportIntervalConfig = {
  hours: {
    defaultValue: 0,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  minutes: {
    defaultValue: 0,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  seconds: {
    defaultValue: 0,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
};

const reportIntervalData = generateForm(reportIntervalConfig);

export {
  reportIntervalData,
};
