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
