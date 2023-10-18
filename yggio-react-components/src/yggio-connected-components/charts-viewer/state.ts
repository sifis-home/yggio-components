import {isValid, isBefore, isAfter, isPast} from 'date-fns';

import {generateForm, VALIDATION_VISIBILITY_TYPES} from '../../utils/form-wizard';
import {FormConfig, InputValue} from '../../types';
import {
  TIME_PERIOD_TYPES,
  RESOLUTIONS,
  INTERPOLATION_OPTIONS,
  RANGES,
} from './constants';

const validTimeValidator = {
  validate: (value: InputValue) => {
    if (typeof value !== 'string') return false; // fix for ts
    return isValid(new Date(value));
  },
  message: 'Not a valid time',
};

const pastTimeValidator = {
  validate: (value: InputValue) => {
    if (typeof value !== 'string') return false; // fix for ts
    return isPast(new Date(value));
  },
  message: 'Must be in the past',
};

const formConfig: FormConfig = {
  timePeriod: {
    defaultValue: TIME_PERIOD_TYPES.day,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
  resolution: {
    defaultValue: RESOLUTIONS.low,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
  customFromTime: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        validTimeValidator,
        pastTimeValidator,
        {
          validate: (value, formInputs) => {
            if (typeof value !== 'string') return false; // fix for ts
            if (!formInputs) return true;
            const toTime = formInputs.customToTime.value as string;
            if (!toTime) return true;
            if (!isBefore(new Date(value), new Date(toTime))) {
              return false;
            }
            return true;
          },
          message: 'Must be before "to" time',
        },
      ]
    },
  },
  customToTime: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [
        validTimeValidator,
        pastTimeValidator,
        {
          validate: (value, formInputs) => {
            if (typeof value !== 'string') return false; // fix for ts
            if (!formInputs) return true;
            const fromTime = formInputs.customFromTime.value as string;
            if (!fromTime) return true;
            if (!isAfter(new Date(value), new Date(fromTime))) {
              return false;
            }
            return true;
          },
          message: 'Must be after "from" time',
        },
      ]
    },
  },
  interpolation: {
    defaultValue: INTERPOLATION_OPTIONS.linear.value,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
  range: {
    defaultValue: RANGES.auto,
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
