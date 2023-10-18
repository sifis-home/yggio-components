import _ from 'lodash';
import {APP_TYPES} from 'yggio-core-constants';

import {generateForm, VALIDATION_VISIBILITY_TYPES} from '../../utils/form-wizard';
import {FormConfig, InputValue} from '../../types';

const formConfig: FormConfig = {
  name: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
  type: {
    defaultValue: APP_TYPES.app,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
  tagline: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        {
          validate (value: InputValue) {
            if (_.isString(value) && value.length >= 64) {
              return false;
            }
            return true;
          },
          message: 'Tagline too long, max length 64 characters',
        }
      ],
    }
  },
  tags: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
  URL: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.always,
      validators: [
        {
          validate (value: InputValue) {
            if (typeof value === 'string') {
              // eslint-disable-next-line
              const urlRegex = /^(?:(https?):\/\/)?[^\s\/$.?#].[^\s]*$/;
              return !!value.match(urlRegex);
            }
            return false;
          },
          message: 'Invalid URL - Please enter a valid URL',
        }
      ],
    }
  },
};

const formState = generateForm(formConfig);

const ACTION_TYPES = {
  incrementCurrentStep: 'incrementCurrentStep',
  decrementCurrentStep: 'decrementCurrentStep',
};

const actions = {
  incrementCurrentStep: () => ({
    type: ACTION_TYPES.incrementCurrentStep,
  }),
  decrementCurrentStep: () => ({
    type: ACTION_TYPES.decrementCurrentStep,
  }),
};

const defaultState = {
  currentStep: 0,
};

// eslint-disable-next-line default-param-last
const reducer = (state = defaultState, action: {type: string}) => {
  if (!action) {
    return state;
  }
  const {type} = action;

  switch (type) {

    case ACTION_TYPES.incrementCurrentStep: {
      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    }
    case ACTION_TYPES.decrementCurrentStep: {
      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    }
    default: {
      return state;
    }

  }
};

const navigationState = {actions, reducer};

export {
  formState,
  navigationState,
};
