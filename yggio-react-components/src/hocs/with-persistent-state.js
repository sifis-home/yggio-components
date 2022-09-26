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
import {getConfig} from '../yggio-config';

const DEV_WARNING_MESSAGE = `Developer Warning: Local storage being cleared can be caused by either
the data being old, in which case things are fine, or it can be caused by faulty
vaildation, in which case the vailidation should be fixed`;

const NAME_PREFIX = 'yggio-';

const withPersistentState = ({reducer, actions, validateState}, name, wrappedName) => Component => {

  if (!reducer) throw Error('DevErr: A persistent state must have a reducer');
  if (!actions) throw Error('DevErr: A persistent state must have a actions');
  if (!validateState) throw Error('DevErr: A persistent state must have a validateState function');
  if (!name) throw Error('DevErr: A persistent state must have a name');

  const fullName = NAME_PREFIX.concat(name);

  const validatePersistentState = persistentState => {
    if (!persistentState) {
      return true;
    }
    const validationError = validateState(persistentState);
    if (validationError) {
      console.info(`Will clear local storage: ${fullName} because of validation error`);
      console.info('validationError: ', validationError);
      if (_.eq(getConfig().nodeEnv, ENV_TYPES.development)) {
        console.warn(DEV_WARNING_MESSAGE);
      }
    }
    return !validationError;
  };

  const reducerWithLogger = createStateLogger(reducer);

  const WrappedComponent = props => {

    const item = localStorage.getItem(fullName);
    const persistentState = JSON.parse(item);

    const persistentStateIsValid = validatePersistentState(persistentState);

    const [state, dispatch] = React.useReducer(
      reducerWithLogger,
      reducer(undefined, {}),
      initial => {
        if (!persistentState || !persistentStateIsValid) {
          return initial;
        }
        return persistentState;
      }
    );

    React.useEffect(() => {
      if (!persistentStateIsValid) {
        localStorage.removeItem(fullName);
      } else {
        localStorage.setItem(fullName, JSON.stringify(state));
      }
    }, [state, fullName]);

    // distribute dispatch
    const actionDispatches = createActionDispatches(actions, dispatch);

    // potentially wrap state and actionDispatches
    const newProps = wrapOrNot(props, state, actionDispatches, wrappedName);

    return (
      <Component
        {...newProps}
      />
    );
  };

  return WrappedComponent;
};

const wrapOrNot = (props, state, actionDispatches, wrappedName) => {
  const obj = {
    ...state,
    ...actionDispatches,
  };
  if (wrappedName) {
    return _.setWith(_.clone(props), wrappedName, obj, _.clone);
  }
  return {
    ...props,
    ...obj,
  };
};

export default withPersistentState;
