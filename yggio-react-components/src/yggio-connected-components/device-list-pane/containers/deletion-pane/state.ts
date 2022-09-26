/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
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
  NavState,
  Actions,
};
