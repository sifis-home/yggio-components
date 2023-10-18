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

export default {
  actions,
  reducer,
};
