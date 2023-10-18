/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {Action} from '../types';
import {createStateLogger, createActionDispatches} from '../utils';

interface UseLocalStateProps<T, S> {
  actions: S;
  reducer(state: T | undefined, action: Action<T> | object): T;
}

const useLocalState = <T, S>({
  reducer,
  actions,
}: UseLocalStateProps<T, S>): T & S => {
  const defaultState = reducer(undefined, {});
  const loggedReducer = createStateLogger(reducer) as React.Reducer<unknown, T>;

  const [state, dispatch] = React.useReducer(loggedReducer, defaultState);
  const actionDispatches = createActionDispatches(actions, dispatch) as S;

  return {
    ...state as T,
    ...actionDispatches,
  };
};

export default useLocalState;
