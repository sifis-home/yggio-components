/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {set} from 'lodash/fp';
import createReducer from '../../utils/create-reducer';

const POSITION_SET = 'POSITION_SET';
const PREV_POSITION_SET = 'PREV_POSITION_SET';

const actions = {
  setPosition: position => ({
    type: POSITION_SET,
    position,
  }),
  setPrevPosition: prevPosition => ({
    type: PREV_POSITION_SET,
    prevPosition,
  }),
};

const defaultState = {
  position: null,
  prevPosition: null,
};

const handlers = {
  [POSITION_SET]: (state, {position}) => set('position', position, state),
  [PREV_POSITION_SET]: (state, {prevPosition}) => set('prevPosition', prevPosition, state),
};

const reducer = createReducer(defaultState, handlers);

export default {
  actions,
  reducer,
};
