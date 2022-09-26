/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// rules.redux.js

import _ from 'lodash';
import {actions as apiActions} from '../api-state.redux';

const ACTION_TYPES = {
  dbRulesActionsReplaceOne: 'dbRulesActionsReplaceOne',
  dbRulesActionsRemoveOne: 'dbRulesActionsRemoveOne',
  dbRulesActionsReplaceMany: 'dbRulesActionsReplaceMany',
};

const internalActions = {
  replaceRulesAction: rulesAction => ({
    type: ACTION_TYPES.dbRulesActionsReplaceOne,
    payload: {rulesAction},
  }),

  removeRulesAction: rulesActionId => ({
    type: ACTION_TYPES.dbRulesActionsRemoveOne,
    payload: {rulesActionId},
  }),

  replaceRulesActions: rulesActions => ({
    type: ACTION_TYPES.dbRulesActionsReplaceMany,
    payload: {rulesActions},
  }),
};

const actions = {
  createRulesAction: rulesActionTemplate => async dispatch => {
    const createRulesActionAction = apiActions.rulesActions.create(rulesActionTemplate);
    const rulesAction = await dispatch(createRulesActionAction);
    dispatch(internalActions.replaceRulesAction(rulesAction));
  },

  fetchRulesActions: () => async dispatch => {
    const fetchRulesActionsAction = apiActions.rulesActions.fetch();
    const rulesActions = await dispatch(fetchRulesActionsAction);
    dispatch(internalActions.replaceRulesActions(rulesActions));
  },

  removeRulesAction: (ruleId, actionId) => async dispatch => {
    const deleteRulesActionAction = apiActions.rulesActions.remove(ruleId, actionId);
    await dispatch(deleteRulesActionAction);
    dispatch(internalActions.removeRulesAction(ruleId));
  },
};

const defaultState = {};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case ACTION_TYPES.dbRulesActionsReplaceOne: {
      const {rulesAction} = action.payload;
      return {...state, [rulesAction._id]: rulesAction};
    }

    case ACTION_TYPES.dbRulesActionsRemoveOne: {
      const {rulesActionId} = action.payload;
      return _.omit(state, rulesActionId);
    }

    case ACTION_TYPES.dbRulesActionsReplaceMany: {
      const {rulesActions} = action.payload;
      const replacements = {};
      _.each(rulesActions, rulesAction => {
        replacements[rulesAction._id] = rulesAction;
      });
      return {
        ...state,
        ...replacements,
      };
    }

    default: {
      return state;
    }
  }
};

export {
  actions,
  reducer,
};
