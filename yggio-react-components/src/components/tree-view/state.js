/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {PropTypes, checkProps} from 'vanilla-prop-types';

const ACTION_TYPES = {
  setToggleState: 'setToggleState',
};

const actions = {
  setToggleState: (nodeId, toggled) => ({
    type: ACTION_TYPES.setToggleState,
    payload: {
      nodeId,
      toggled,
    },
  }),
};

const defaultState = {
  toggleState: {},
};

const propTypes = {
  toggleState: PropTypes.object.isRequired,
};

const reducer = (state = defaultState, action) => {
  if (!action) {
    return state;
  }
  const {type, payload} = action;

  switch (type) {
    case ACTION_TYPES.setToggleState: {
      const {nodeId, toggled} = payload;
      return {
        ...state,
        toggleState: {
          ...state.toggleState,
          [nodeId]: toggled,
        },
      };
    }

    default: {
      return state;
    }

  }
};

const validateState = checkProps(propTypes, {isExact: true});

export default {
  actions,
  reducer,
  validateState,
};
