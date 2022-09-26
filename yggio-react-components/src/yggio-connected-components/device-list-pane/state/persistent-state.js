/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {PropTypes, checkProps} from 'vanilla-prop-types';

import {DEFAULT_PAGE_SIZE, COLUMN_PRESETS} from '../constants';

const ACTION_TYPES = {
  setFilterCollapsed: 'setFilterCollapsed',
  setCurrentPage: 'setCurrentPage',
  setPageSize: 'setPageSize',
  setSortingOrder: 'setSortingOrder',
  setSortingField: 'setSortingField',
  setColumns: 'setColumns',
};

const defaultState = {
  filterCollapsed: {},
  currentPage: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  sortingOrder: 'asc',
  sortingField: 'name',
  columns: COLUMN_PRESETS.default.columns,
};

const propTypes = {
  filterCollapsed: PropTypes.object.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  sortingOrder: PropTypes.string.isRequired,
  sortingField: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const validateState = checkProps(propTypes, {isExact: true});

const actions = {
  setFilterCollapsed: filter => ({
    type: ACTION_TYPES.setFilterCollapsed,
    payload: {filter},
  }),
  setCurrentPage: currentPage => ({
    type: ACTION_TYPES.setCurrentPage,
    payload: {currentPage},
  }),
  setPageSize: pageSize => ({
    type: ACTION_TYPES.setPageSize,
    payload: {pageSize},
  }),
  setSortingOrder: sortingOrder => ({
    type: ACTION_TYPES.setSortingOrder,
    payload: {sortingOrder},
  }),
  setSortingField: sortingField => ({
    type: ACTION_TYPES.setSortingField,
    payload: {sortingField},
  }),
  setColumns: columns => ({
    type: ACTION_TYPES.setColumns,
    payload: {columns},
  }),
};

const reducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {

    case ACTION_TYPES.setFilterCollapsed: {
      const {filter} = payload;
      return {
        ...state,
        filterCollapsed: {
          ...state.filterCollapsed,
          [filter]: !state.filterCollapsed[filter],
        },
      };
    }

    case ACTION_TYPES.setCurrentPage: {
      const {currentPage} = payload;
      return {
        ...state,
        currentPage,
      };
    }

    case ACTION_TYPES.setPageSize: {
      const {pageSize} = payload;
      return {
        ...state,
        pageSize,
      };
    }

    case ACTION_TYPES.setSortingOrder: {
      const {sortingOrder} = payload;
      return {
        ...state,
        sortingOrder,
      };
    }

    case ACTION_TYPES.setSortingField: {
      const {sortingField} = payload;
      return {
        ...state,
        sortingField,
      };
    }

    case ACTION_TYPES.setColumns: {
      const {columns} = payload;
      return {
        ...state,
        columns,
      };
    }

    default: {
      return state;
    }

  }
};

export default {
  actions,
  reducer,
  validateState,
};
