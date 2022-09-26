/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// image-manager/state.js

import _ from 'lodash';
import {IMAGE_NAME_SPACES} from '../../constants';

const ACTION_TYPES = {
  imageManagerSetNameState: 'imageManagerSetNameState',
};

const actions = {

  setNameSpace: nameSpace => ({
    type: ACTION_TYPES.imageManagerSetNameState,
    payload: {nameSpace},
  }),

};

const defaultState = {
  nameSpace: IMAGE_NAME_SPACES.blueprints,
};

const reducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {

    case ACTION_TYPES.imageManagerSetNameState: {
      const {nameSpace} = payload;
      return {
        ...state,
        nameSpace,
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
};

export default state;
