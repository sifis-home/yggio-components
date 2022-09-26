/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
const _ = require('lodash');

const combineReducers = reducers => {

  // validate input & evaluate the default state
  const defaultState = {};
  if (!_.isObject(reducers) || !_.size(reducers)) {
    throw new Error('Invalid reducers. Must be an object with subreducer props');
  }
  _.each(reducers, (reducer, key) => {
    if (!key.length) {
      throw new Error('Invalid reducer: reducer name must be non-zero length');
    }
    if (!_.isFunction(reducer)) {
      throw new Error('Invalid reducer: the reducer must be a function');
    }
    const emptyAction = {};
    const emptyState = undefined;
    const origState = reducer(emptyState, emptyAction);
    const nextState = reducer(origState, emptyAction);
    if (origState !== nextState) {
      throw new Error('Invalid reducer: should always return defaultState for non-matching actionTypes');
    }
    defaultState[key] = origState;
  });

  // build the reducer
  const reducer = (state = defaultState, action) => {
    let modState = state;
    _.each(reducers, (reducer, key) => {
      const currState = state[key];
      const nextState = reducer(currState, action);
      if (nextState !== currState) {
        modState = {...state, [key]: nextState};
        return false; // exit early
      }
    });
    return modState; // === state if undchanged
  };

  return reducer;
};

export default combineReducers;
