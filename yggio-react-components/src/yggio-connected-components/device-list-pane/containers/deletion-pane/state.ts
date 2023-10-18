import {Action} from '../../../../types';

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


const navigationState = {
  actions,
  reducer,
};

export {
  navigationState,
};

export type {
  NavState,
  Actions,
};
