import _ from 'lodash';
import React, {useReducer} from 'react';
import {createActionDispatches, createStateLogger} from '../utils';

/*
  THIS HOC IS DEPRICATED!!!
*/


/**
 * Requires a state object containing reducer, defaultState and actions to function.
 * Will use logger if in development mode.
 *
 * @param reducer - state reducer
 * @param defaultState - object containing initial state
 * @param actions - object of state actions
 * @returns {function(*): function(*): *}
 */
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

const withState = ({reducer, actions}, wrappedName) => Component => {
  // set up
  const defaultState = reducer(undefined, {});
  const reducerWithLogger = createStateLogger(reducer);

  const WrappedComponent = props => {
    // NATIVE React.useReducer
    const [state, dispatch] = useReducer(reducerWithLogger, defaultState);
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

export default withState;
