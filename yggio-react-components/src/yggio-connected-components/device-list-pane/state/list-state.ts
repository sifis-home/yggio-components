import {DEFAULT_PAGE_SIZE, COLUMNS, COLUMN_PRESETS} from '../constants';
import type {Column} from '../constants';

const ACTION_TYPES = {
  setFilterCollapsed: 'setFilterCollapsed',
  setCurrentPage: 'setCurrentPage',
  setPageSize: 'setPageSize',
  setSortingOrder: 'setSortingOrder',
  setSortingField: 'setSortingField',
  setColumns: 'setColumns',
  setCursorId: 'setCursorId',
  setCursorDirection: 'setCursorDirection',
  reset: 'reset',
};

interface State {
  filterCollapsed: Record<string, boolean>;
  currentPage: number;
  pageSize: number;
  sortingOrder: string;
  sortingField: string;
  columns: Column[];
  cursorId: string | null;
  cursorDirection: string | null;
}

const defaultState: State = {
  filterCollapsed: {},
  currentPage: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  sortingOrder: 'asc',
  sortingField: 'name',
  columns: COLUMN_PRESETS.default.columns,
  cursorId: null,
  cursorDirection: null,
};

const actions = {
  setFilterCollapsed: (filter: string) => ({
    type: ACTION_TYPES.setFilterCollapsed,
    payload: {filter},
  }),
  setCurrentPage: (currentPage: number) => ({
    type: ACTION_TYPES.setCurrentPage,
    payload: {currentPage},
  }),
  setPageSize: (pageSize: number) => ({
    type: ACTION_TYPES.setPageSize,
    payload: {pageSize},
  }),
  setSortingOrder: (sortingOrder: string) => ({
    type: ACTION_TYPES.setSortingOrder,
    payload: {sortingOrder},
  }),
  setSortingField: (sortingField: string) => ({
    type: ACTION_TYPES.setSortingField,
    payload: {sortingField},
  }),
  setColumns: (columns: Column[]) => ({
    type: ACTION_TYPES.setColumns,
    payload: {columns},
  }),
  setCursorId: (cursorId: string | null) => ({
    type: ACTION_TYPES.setCursorId,
    payload: {cursorId},
  }),
  setCursorDirection: (cursorDirection: string | null) => ({
    type: ACTION_TYPES.setCursorDirection,
    payload: {cursorDirection},
  }),
  reset: () => ({
    type: ACTION_TYPES.reset,
  }),
};

interface Payload {
  filter: string;
  currentPage: number;
  pageSize: number;
  sortingOrder: string;
  sortingField: string;
  columns: (keyof typeof COLUMNS)[];
  cursorId: string | null;
  cursorDirection: string | null;
}

const reducer = (state: State = defaultState, action: {type: string, payload: Payload}) => {
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

    case ACTION_TYPES.setCursorId: {
      const {cursorId} = payload;
      return {
        ...state,
        cursorId,
      };
    }

    case ACTION_TYPES.setCursorDirection: {
      const {cursorDirection} = payload;
      return {
        ...state,
        cursorDirection,
      };
    }

    case ACTION_TYPES.reset: {
      return defaultState;
    }

    default: {
      return state;
    }

  }
};

export default {
  actions,
  reducer,
};
