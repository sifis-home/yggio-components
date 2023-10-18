/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {set} from 'lodash/fp';
import createReducer from '../../utils/create-reducer';

const PAGINATION_SET_CURRENT_PAGE = 'PAGINATION_SET_CURRENT_PAGE';

const actions = {
  setCurrentPage: currentPage => ({
    type: PAGINATION_SET_CURRENT_PAGE,
    currentPage,
  }),
};

const defaultState = {
  currentPage: 1,
};

const handlers = {
  [PAGINATION_SET_CURRENT_PAGE]: (state, {currentPage}) => (
    set('currentPage', currentPage, state)
  ),
};

const reducer = createReducer(defaultState, handlers);

export default {
  actions,
  reducer,
};
