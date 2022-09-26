/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React, {createContext, useReducer, useMemo} from 'react';
import {createStateLogger} from '../../../utils';

const STATES = {
  selectedDevices: 'selectedDevices',
  selectMode: 'selectMode',
};

const ACTION_TYPES = {
  setSelectedDevices: 'setSelectedDevices',
  setSelectMode: 'setSelectMode',
};

const actions = {
  setSelectedDevices: selectedDevices => ({
    type: ACTION_TYPES.setSelectedDevices,
    payload: {selectedDevices},
  }),
  setSelectMode: selectMode => ({
    type: ACTION_TYPES.setSelectMode,
    payload: {selectMode},
  }),
};

const defaultState = {
  [STATES.selectedDevices]: [],
  [STATES.selectMode]: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case ACTION_TYPES.setSelectedDevices: {
      const {selectedDevices} = action.payload;
      return {
        ...state,
        selectedDevices,
      };
    }

    case ACTION_TYPES.setSelectMode: {
      const {selectMode} = action.payload;
      return {
        ...state,
        selectMode,
      };
    }

    default: {
      return state;
    }

  }
};

const StateContext = createContext({});

const StateContextProvider = props => {
  const reducerWithLogger = createStateLogger(reducer);

  const defaultState = reducer(undefined, {});
  const [state, dispatch] = useReducer(reducerWithLogger, defaultState);
  const value = useMemo(() => {
    return {state, dispatch};
  }, [state]);

  return (
    <StateContext.Provider value={value}>
      {props.children}
    </StateContext.Provider>
  );
};

export {
  actions,
  reducer,
  StateContext,
  StateContextProvider,
};
