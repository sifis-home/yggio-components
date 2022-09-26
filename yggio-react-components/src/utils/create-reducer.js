/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {has} from 'lodash/fp';

/**
 *
 * @param defaultState - initial state
 * @param handlers - object of reducer cases
 * @returns {function(*=, *=): *}
 */
const createReducer = (defaultState, handlers) => (
  (state = defaultState, action) => (has(action.type, handlers)
    ? handlers[action.type](state, action)
    : state)
);

export default createReducer;
