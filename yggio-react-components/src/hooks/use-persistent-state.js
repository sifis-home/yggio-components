/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import React from 'react';

import {createActionDispatches, createStateLogger} from '../utils';
import {ENV_TYPES} from '../constants';
import CONFIG from '../yggio-config';

const DEV_WARNING_MESSAGE = `Developer Warning: Local storage being cleared can be caused by either
the data being old, in which case things are fine, or it can be caused by faulty
vaildation, in which case the vailidation should be fixed`;

const NAME_PREFIX = 'yggio-';

const validatePersistentState = ({persistentState, state, fullName}) => {
  if (!persistentState) {
    return true;
  }
  const persistentStateKeys = _.keys(persistentState);
  const stateKeys = _.keys(state);
  const isValid = _.isEqual(persistentStateKeys, stateKeys);
  if (!isValid) {
    console.info(`Will clear local storage: ${fullName} because of validation error`);
    if (_.eq(_.get(CONFIG, 'nodeEnv'), ENV_TYPES.development)) {
      console.warn(DEV_WARNING_MESSAGE);
    }
  }

  return isValid;
};

const usePersistentState = ({reducer, actions}, name) => {
  if (!reducer) throw Error('DevErr: A persistent state must have a reducer');
  if (!actions) throw Error('DevErr: A persistent state must have a actions');
  if (!name) throw Error('DevErr: A persistent state must have a name');

  const fullName = NAME_PREFIX.concat(name);

  const reducerWithLogger = createStateLogger(reducer);

  const item = localStorage.getItem(fullName);
  const persistentState = JSON.parse(item);

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

  const persistentStateIsValid = validatePersistentState({persistentState, state, fullName});

  React.useEffect(() => {
    if (!persistentStateIsValid) {
      localStorage.removeItem(fullName);
    } else {
      localStorage.setItem(fullName, JSON.stringify(state));
    }
  }, [state, fullName]);

  // distribute dispatch
  const actionDispatches = createActionDispatches(actions, dispatch);

  return {
    ...actionDispatches,
    ...state,
  };

};

export default usePersistentState;
