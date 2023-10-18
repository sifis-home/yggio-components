import _ from 'lodash';
import {Parameter} from '../types';

const ACTION_TYPES = {
  toggleParameter: 'toggleParameter',
};

const actions = {
  toggleParameter: (parameter: Parameter) => ({
    type: ACTION_TYPES.toggleParameter,
    payload: {parameter}
  }),
};

const defaultState = {
  parameters: {
    name: false,
    description: false,
    location: false,
    realEstateCore: false,
    contextualParameters: false,
  }
};

interface Action {
  type: string,
  payload: {parameter: Parameter}
}

const reducer = (state = defaultState, action: Action) => {
  if (!action || _.isEmpty(action)) {
    return state;
  }
  const {type, payload} = action;
  const {parameter} = payload;

  switch (type) {

    case ACTION_TYPES.toggleParameter: {
      return {
        ...state,
        parameters: {
          ...state.parameters,
          [parameter]: !state.parameters[parameter],
        }
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
