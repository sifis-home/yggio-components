const ACTION_TYPES = {
  openSidebar: 'openSidebar',
  closeSidebar: 'closeSidebar',
};

const defaultState = {
  isSidebarOpen: true,
};


const actions = {
  openSidebar: () => ({
    type: ACTION_TYPES.openSidebar,
  }),
  closeSidebar: () => ({
    type: ACTION_TYPES.closeSidebar,
  }),
};

const reducer = (state = defaultState, action) => {
  const {type} = action;
  switch (type) {

    case ACTION_TYPES.openSidebar: {
      return {
        ...state,
        isSidebarOpen: true,
      };
    }
    case ACTION_TYPES.closeSidebar: {
      return {
        ...state,
        isSidebarOpen: false,
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
};
