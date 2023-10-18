/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const _ = require('lodash');

/**
* Creates thunk-like action action-creators giving the user the means to create
* BOTH sync and/or async actions (this function does not discriminate). This will
* dispatch the action and return the result if any.
* @param actions
* @param dispatch
* @returns {*}
 */

const createActionDispatches = (actions, dispatch) => {
  const dispatcher = action => (...args) => {
    const triggeredAction = action(...args);
    if (_.isFunction(triggeredAction)) {
      return triggeredAction(dispatch);
    }
    if (_.isObject(triggeredAction)) {
      return dispatch(triggeredAction);
    }
    throw new Error('DevErr: a triggered action must be a function or an object');
  };
  return _.mapValues(actions, action => dispatcher(action));
};

export default createActionDispatches;
