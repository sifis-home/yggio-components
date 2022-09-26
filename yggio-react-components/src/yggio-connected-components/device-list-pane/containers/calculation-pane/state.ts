/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {format} from 'date-fns';
import {Action, InputValue} from '../../../../types';
import {generateForm, inputValidators, VALIDATION_VISIBILITY_TYPES} from '../../../../utils/form-wizard';

interface NavState {
  [currentStep: string]: number;
}

const saveToDeviceFormData = {
  deviceSelection: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [{
        validate: (value: InputValue) => !!value,
        message: 'Please select a valid device',
      }],
    }
  },
};

const createNewDeviceFormData = {
  createDeviceName: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validMessage: `Valid`,
      validators: [
        inputValidators.inputRequired('Please enter a name'),
        inputValidators.maximumLength(50),
      ],
    }
  },
};

const createCalculation = {
  preset: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [{
        validate: (value: InputValue) => !!value,
        message: 'Please choose a preset',
      }],
    }
  },
  name: {
    defaultValue: 'Your custom calculation description',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [{
        validate: (value: InputValue) => !!value,
        message: 'Please enter a valid name',
      }],
    }
  },
  devicePath: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [{
        validate: (value: InputValue) => !!value,
        message: 'Please enter a valid path',
      }],
    }
  },
  calculationType: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [{
        validate: (value: InputValue) => !!value,
        message: 'Please enter a valid calculation',
      }],
    }
  },
  groupType: {
    defaultValue: 'series',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [{
        validate: (value: InputValue) => !!value,
        message: 'Please enter a valid group type',
      }],
    }
  },
  interval: {
    defaultValue: false,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  calculationTimePeriodFrom: {
    defaultValue: '1970-01-01T00:00',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  calculationTimePeriodTo: {
    defaultValue: format(new Date(), 'yyyy-MM-dd\'T\'hh:mm'),
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  destination: {
    defaultValue: 'createNewDevice',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [{
        validate: (value: InputValue) => !!value,
        message: 'Please enter a valid destination',
      }],
    }
  },
  customDestinationPath: {
    defaultValue: 'data',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
      validators: [{
        validate: (value: InputValue) => _.isString(value) && !(/\s/g.test(value)),
        message: 'Please enter a valid destination path',
      }],
    }
  },
  deviceNameFilter: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  devices: {
    defaultValue: {},
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
  automaticUpdate: {
    defaultValue: true,
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
};

const performCalculation = {
  selectedCalculation: {
    defaultValue: '',
    validation: {
      visibilityType: VALIDATION_VISIBILITY_TYPES.optIn,
    }
  },
};

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

const formData = {
  ...createCalculation,
  ...saveToDeviceFormData,
  ...createNewDeviceFormData,
  ...performCalculation,
};

const formState = generateForm(formData);


export {
  formState,
  navigationState,
  NavState,
};
