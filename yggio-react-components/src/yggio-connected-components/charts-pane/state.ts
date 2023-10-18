/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';

import {Field} from './types';

const ACTION_TYPES = {
  addField: 'addField',
  removeField: 'removeField',
  clearFields: 'clearFields',
  forceStateUpdate: 'forceStateUpdate',
};

const actions = {
  addField: (fieldName: string) => ({
    type: ACTION_TYPES.addField,
    payload: {
      fieldName,
    }
  }),
  removeField: (fieldName: string) => ({
    type: ACTION_TYPES.removeField,
    payload: {
      fieldName,
    }
  }),
  clearFields: () => ({
    type: ACTION_TYPES.clearFields,
  }),
  forceStateUpdate: () => ({
    type: ACTION_TYPES.forceStateUpdate,
  }),
};

const defaultState = {
  fields: [],
  force: 0,
};

type State = {
  fields: Field[];
  force: number;
};

type Action = {
  type: string;
  payload: {
    deviceId: string;
    deviceName: string;
    fieldName: string;
  };
};

const reducer = (state: State = defaultState, action: Action) => {
  if (!action) {
    return state;
  }
  const {type, payload} = action;

  switch (type) {

    case ACTION_TYPES.addField: {
      const newField = {
        name: action.payload.fieldName,
      };
      return {
        ...state,
        fields: [...state.fields, newField],
      };
    }

    case ACTION_TYPES.removeField: {
      const updatedFields = _.reject(state.fields, ['name', payload.fieldName]);
      return {
        ...state,
        fields: updatedFields,
      };
    }

    case ACTION_TYPES.clearFields: {
      return {
        ...state,
        fields: [],
      };
    }

    case ACTION_TYPES.forceStateUpdate: {
      return {
        ...state,
        force: state.force + 1,
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
