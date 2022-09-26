/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
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
};

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
