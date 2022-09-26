/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
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
