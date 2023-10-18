const ACTION_TYPES = {
  stepForward: 'incrementCurrentStep',
  stepBack: 'decrementCurrentStep',
  goToStep: 'goToStep',
};

const actions = {
  stepForward: () => ({
    type: ACTION_TYPES.stepForward,
  }),
  stepBack: () => ({
    type: ACTION_TYPES.stepBack,
  }),
  goToStep: (step: number) => ({
    type: ACTION_TYPES.goToStep,
    payload: {step},
  }),
};

const defaultState = {
  currentStep: 0,
};

interface Payload {
  step: number;
}

const reducer = (state = defaultState, action: {type: string, payload: Payload}) => {
  if (!action) {
    return state;
  }
  const {type, payload} = action;

  switch (type) {

    case ACTION_TYPES.stepForward: {
      return {
        currentStep: state.currentStep + 1,
      };
    }
    case ACTION_TYPES.stepBack: {
      return {
        currentStep: state.currentStep - 1,
      };
    }
    case ACTION_TYPES.goToStep: {
      return {
        currentStep: payload.step,
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
