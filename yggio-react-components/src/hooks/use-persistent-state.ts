import _ from 'lodash';
import React from 'react';

import {Action} from '../types';
import {createActionDispatches, createStateLogger} from '../utils';
import {ENV_TYPES} from '../constants';
import {getConfig} from '../yggio-config';

const DEV_WARNING_MESSAGE = `Developer Warning: Local storage being cleared can be caused by either
the data being old, in which case things are fine, or it can be caused by faulty
vaildation, in which case the vailidation should be fixed`;

const NAME_PREFIX = 'yggio-';

interface UseLocalStateProps<T, S> {
  actions: S;
  reducer(state: T | undefined, action: Action<T> | object): T;
}

const usePersistentState = <T, S>(
  {reducer, actions}: UseLocalStateProps<T, S>,
  name: string
) => {

  const CONFIG = getConfig();

  if (!reducer) throw Error('DevErr: A persistent state must have a reducer');
  if (!actions) throw Error('DevErr: A persistent state must have a actions');
  if (!name) throw Error('DevErr: A persistent state must have a name');

  const validatePersistentState = (persistentState: T, state: T, fullName: string) => {
    if (!persistentState) {
      return true;
    }
    const persistentStateKeys = _.keys(persistentState);
    const stateKeys = _.keys(state);
    const isValid = _.isEqual(persistentStateKeys, stateKeys);
    if (!isValid) {
      console.info(`Will clear local storage: ${fullName} because of validation error`);
      if (CONFIG.nodeEnv === ENV_TYPES.development) {
        console.warn(DEV_WARNING_MESSAGE);
      }
    }

    return isValid;
  };

  const fullName = NAME_PREFIX.concat(name);

  const reducerWithLogger = createStateLogger(reducer) as React.Reducer<unknown, T>;

  const item = localStorage.getItem(fullName);
  const persistentState = JSON.parse(item!) as T;

  const [state, dispatch] = React.useReducer(
    reducerWithLogger,
    reducer(undefined, {}),
    initial => {
      if (!persistentState) {
        return initial;
      }
      return persistentState;
    }
  );

  const persistentStateIsValid = validatePersistentState(persistentState, state as T, fullName);

  React.useEffect(() => {
    if (!persistentStateIsValid) {
      localStorage.removeItem(fullName);
    } else {
      localStorage.setItem(fullName, JSON.stringify(state));
    }
  }, [state, fullName]);

  // distribute dispatch
  const actionDispatches = createActionDispatches(actions, dispatch) as S;

  return {
    ...actionDispatches,
    ...state as T,
  };

};

export default usePersistentState;
