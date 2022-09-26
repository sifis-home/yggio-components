/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {actions as apiActions} from '../api-state.redux';

const ACTION_TYPES = {
  dbTranslatorsReplaceOne: 'dbTranslatorsReplaceOne',
  dbTranslatorsRemoveOne: 'dbTranslatorsRemoveOne',
  dbTranslatorsReplaceMany: 'dbTranslatorsReplaceMany',
};


const internalActions = {

  replaceTranslators: translators => ({
    type: ACTION_TYPES.dbTranslatorsReplaceMany,
    payload: {translators},
  }),

};

const actions = {

  fetchTranslators: deviceModelName => async dispatch => {
    const fetchTranslatorsAction = apiActions.translators.fetch(deviceModelName);
    const translators = await dispatch(fetchTranslatorsAction);
    dispatch(internalActions.replaceTranslators(translators));
  }
};

const defaultState = {};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case ACTION_TYPES.dbTranslatorsReplaceMany: {
      const {translators} = action.payload;
      const replacements = {};
      _.each(translators, translator => {
        replacements[translator._id] = translator;
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
