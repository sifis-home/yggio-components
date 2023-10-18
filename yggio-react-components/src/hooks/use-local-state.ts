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
