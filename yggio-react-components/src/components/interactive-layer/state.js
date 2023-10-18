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
