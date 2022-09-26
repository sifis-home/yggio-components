/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {MAP} from '../../constants';

const MAP_MOVING_MODE_SET = 'MAP_MOVING_MODE_SET';
const MAP_VIEWPORT_SET = 'MAP_VIEWPORT_SET';

const actions = {
  setMovingMode: movingMode => ({
    type: MAP_MOVING_MODE_SET,
    payload: {movingMode},
  }),
  setViewport: viewport => ({
    type: MAP_VIEWPORT_SET,
    payload: {viewport},
  }),
};

const defaultState = {
  movingMode: false,
  viewport: {center: MAP.defaultCenter, zoom: MAP.defaultZoom},
};

const reducer = (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {

    case MAP_MOVING_MODE_SET: {
      const {movingMode} = payload;
      return {
        ...state,
        movingMode,
      };
    }

    case MAP_VIEWPORT_SET: {
      const {viewport} = payload;
      return {
        ...state,
        viewport,
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
