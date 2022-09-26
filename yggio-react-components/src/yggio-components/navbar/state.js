/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
const ACTION_TYPES = {
  showMenuDropdown: 'showMenuDropdown',
  showLanguageDropdown: 'showLanguageDropdown',
  showUserDropdown: 'showUserDropdown',
  showDocsDropdown: 'showDocsDropdown',
  showConectivityDropdown: 'showConectivityDropdown',
  closeAllDropdowns: 'closeAllDropdowns',
};

const actions = {
  showMenuDropdown: () => ({
    type: ACTION_TYPES.showMenuDropdown,
  }),
  showLanguageDropdown: () => ({
    type: ACTION_TYPES.showLanguageDropdown,
  }),
  showUserDropdown: () => ({
    type: ACTION_TYPES.showUserDropdown,
  }),
  showDocsDropdown: () => ({
    type: ACTION_TYPES.showDocsDropdown,
  }),
  showConnectivityDropdown: () => ({
    type: ACTION_TYPES.showConectivityDropdown,
  }),
  closeAllDropdowns: () => ({
    type: ACTION_TYPES.closeAllDropdowns,
  }),
};

const defaultState = {
  isShowingMenuDropdown: false,
  isShowingLanguageDropdown: false,
  isShowingUserDropdown: false,
  isShowingDocsDropdown: false,
  isShowingConnectivityDropdown: false,
};

const reducer = (state = defaultState, action) => {
  const {type} = action;
  switch (type) {

    case ACTION_TYPES.showMenuDropdown: {
      return {
        ...defaultState,
        isShowingMenuDropdown: true,
      };
    }

    case ACTION_TYPES.showLanguageDropdown: {
      return {
        ...defaultState,
        isShowingLanguageDropdown: true,
      };
    }

    case ACTION_TYPES.showUserDropdown: {
      return {
        ...defaultState,
        isShowingUserDropdown: true,
      };
    }

    case ACTION_TYPES.showDocsDropdown: {
      return {
        ...defaultState,
        isShowingDocsDropdown: true,
      };
    }

    case ACTION_TYPES.showConectivityDropdown: {
      return {
        ...defaultState,
        isShowingConnectivityDropdown: true,
      };
    }

    case ACTION_TYPES.closeAllDropdowns: {
      return defaultState;
    }

    default: {
      return state;
    }

  }
};

export default {
  actions,
  defaultState,
  reducer,
};
