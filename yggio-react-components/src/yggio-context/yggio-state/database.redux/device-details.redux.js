/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// device-details.redux.js

// This is a composite object -- uses deviceId as primary index

import _ from 'lodash';

const ACTION_TYPES = {
  dbDeviceDetailsRemoveAll: 'dbDeviceDetailsRemoveAll',
  dbDeviceDetailsReplaceMany: 'dbDeviceDetailsReplaceMany',
  dbDeviceDetailsReplaceOne: 'dbDeviceDetailsReplaceOne',
};


const internalActions = {

  removeAllDeviceDetails: () => ({
    type: ACTION_TYPES.dbDeviceDetailsRemoveAll,
  }),

  replaceDeviceDetails: deviceDetails => ({
    type: ACTION_TYPES.dbDeviceDetailsReplaceMany,
    payload: {deviceDetails},
  }),

  replaceUser: deviceDetail => ({
    type: ACTION_TYPES.dbDeviceDetailsReplaceOne,
    payload: {deviceDetail},
  }),

};


const actions = {};

const defaultState = {};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case ACTION_TYPES.dbDeviceDetailsRemoveAll: {
      return defaultState;
    }

    case ACTION_TYPES.dbDeviceDetailsReplaceMany: {
      const {deviceDetails} = action.payload;
      const replacements = {};
      _.each(deviceDetails, deviceDetail => {
        replacements[deviceDetail.resourceId] = deviceDetail;
      });
      return {
        ...state,
        ...replacements,
      };
    }

    case ACTION_TYPES.dbDeviceDetailsReplaceOne: {
      const {deviceDetail} = action.payload;
      return {
        ...state,
        [deviceDetail.resourceId]: deviceDetail,
      };
    }

    default: {
      return state;
    }
  }
};

export {
  internalActions,
  actions,
  reducer,
};
