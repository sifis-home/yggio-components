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
