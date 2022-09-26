/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
const ACTION_TYPES = {
  orgManagerSetWindowState: 'orgManagerSetWindowState',
  orgManagerSetSelectedOrganization: 'orgManagerSetSelectedOrganization',
  orgManagerSetEditedOrganization: 'orgManagerSetEditedOrganization',
};

const WINDOW_STATES = {
  list: 'list',
  create: 'create',
  edit: 'edit',
};

const actions = {

  setWindowState: windowState => ({
    type: ACTION_TYPES.orgManagerSetWindowState,
    payload: {windowState},
  }),

  setSelectedOrganization: selectedOrganization => ({
    type: ACTION_TYPES.orgManagerSetSelectedOrganization,
    payload: {selectedOrganization},
  }),

  setEditedOrganization: editedOrganization => ({
    type: ACTION_TYPES.orgManagerSetEditedOrganization,
    payload: {editedOrganization},
  }),

};

const defaultState = {
  windowState: WINDOW_STATES.list,
  selectedOrganization: null,
  editedOrganization: null,
};

const reducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {

    case ACTION_TYPES.orgManagerSetWindowState: {
      const {windowState} = payload;
      return {
        ...state,
        windowState,
      };
    }

    case ACTION_TYPES.orgManagerSetSelectedOrganization: {
      const {selectedOrganization} = payload;
      return {
        ...state,
        selectedOrganization: selectedOrganization || null,
      };
    }

    case ACTION_TYPES.orgManagerSetEditedOrganization: {
      const {editedOrganization} = payload;
      return {
        ...state,
        editedOrganization: editedOrganization || null,
      };
    }

    default: {
      return state;
    }

  }
};

const state = {
  actions,
  reducer,
  WINDOW_STATES,
};

export default state;
