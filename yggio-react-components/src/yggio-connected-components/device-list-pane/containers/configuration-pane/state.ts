import {Action, InputValue} from '../../../../types';
import {
  generateForm,
  VALIDATION_VISIBILITY_TYPES,
} from '../../../../utils/form-wizard';


interface NavState {
  [currentStep: string]: number;
}

const ACTION_TYPES = {
  setCurrentStep: 'setCurrentStep',
  incrementCurrentStep: 'incrementCurrentStep',
  decrementCurrentStep: 'decrementCurrentStep',
};

interface Actions {
  setCurrentStep: (currentStep: number) => void;
  incrementCurrentStep: () => void;
  decrementCurrentStep: () => void;
}

const actions: Actions = {
  setCurrentStep: (currentStep: number) => ({
    type: ACTION_TYPES.setCurrentStep,
    payload: {currentStep},
  }),
  incrementCurrentStep: () => ({
    type: ACTION_TYPES.incrementCurrentStep,
  }),
  decrementCurrentStep: () => ({
    type: ACTION_TYPES.decrementCurrentStep,
  }),
};

const defaultState: NavState = {
  currentStep: 0,
};

const reducer = (
  state = defaultState,
  action: Action<NavState>,
) => {
  if (!action) {
    return state;
  }
  const {type, payload} = action;

  switch (type) {
    case ACTION_TYPES.setCurrentStep: {
      const {currentStep} = payload;
      return {
        ...state,
        currentStep,
      };
    }
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

const configurationFormConfig = {
  option: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [{
        validate: (value: InputValue) => !!value,
        message: 'Please select a valid option',
      }],
    }
  },
};

const presetFormConfig = {
  preset: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [{
        validate: (value: InputValue) => !!value,
        message: 'Please select a valid preset',
      }],
    }
  },
};

const loraFormConfig = {
  fPort: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [{
        validate: (value: InputValue) => !!value,
        message: 'Please use a valid fPort',
      }],
    }
  },
  data: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [{
        validate: (value: InputValue) => !!value,
        message: 'Please use valid data',
      }],
    }
  },
  reference: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  confirmed: {
    defaultValue: 'false',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  flush: {
    defaultValue: 'false',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    },
  },
};

const formState = generateForm({
  ...configurationFormConfig,
  ...loraFormConfig,
  ...presetFormConfig,
});

const navigationState = {
  actions,
  reducer,
};

export {
  navigationState,
  formState,
};

export type {
  NavState,
  Actions,
};
