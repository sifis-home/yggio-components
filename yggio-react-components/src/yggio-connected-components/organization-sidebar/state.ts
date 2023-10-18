/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */


const ACTION_TYPES = {
  setToggleState: 'setToggleState',
};

interface State {
  toggleState: Record<string, boolean>;
}

const defaultState: State = {
  toggleState: {},
};

const actions = {
  setToggleState: (nodeId: string, isToggled: boolean) => ({
    type: ACTION_TYPES.setToggleState,
    payload: {nodeId, isToggled},
  }),
};

interface Payload {
  nodeId: string;
  isToggled: boolean;
}

const reducer = (state: State = defaultState, action: {type: string, payload: Payload}) => {
  const {type, payload} = action;
  switch (type) {

    case ACTION_TYPES.setToggleState: {
      const {nodeId, isToggled} = payload;
      return {
        ...state,
        toggleState: {
          ...state.toggleState,
          [nodeId]: isToggled,
        },
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
