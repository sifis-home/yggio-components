/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// devices.redux.js

import _ from 'lodash';
import {actions as apiActions} from '../api-state.redux';
import {actions as deviceTotalCountActions} from './device-total-count.redux';

const ACTION_TYPES = {
  dbDevicesReplaceOne: 'dbDevicesReplaceOne',
  dbDevicesRemoveOne: 'dbDevicesRemoveOne',
  dbDevicesReplaceMany: 'dbDevicesReplaceMany',
  dbDevicesRemoveMany: 'dbDevicesRemoveMany',
};


const internalActions = {
  replaceDevice: device => ({
    type: ACTION_TYPES.dbDevicesReplaceOne,
    payload: {device},
  }),
  removeDevice: deviceId => ({
    type: ACTION_TYPES.dbDevicesRemoveOne,
    payload: {deviceId},
  }),
  removeDevices: deviceIds => ({
    type: ACTION_TYPES.dbDevicesRemoveOne,
    payload: {deviceIds},
  }),
  replaceDevices: devices => ({
    type: ACTION_TYPES.dbDevicesReplaceMany,
    payload: {devices},
  }),
};

const actions = {
  getDevice: ({deviceId}) => async dispatch => {
    const getDeviceAction = apiActions.devices.get({deviceId});
    const device = await dispatch(getDeviceAction);
    dispatch(internalActions.replaceDevice(device));
  },
  deleteDevice: ({deviceId}) => async dispatch => {
    const deleteDeviceAction = apiActions.devices.remove({deviceId});
    await dispatch(deleteDeviceAction);
    dispatch(internalActions.removeDevice(deviceId));
  },
  deleteDevices: deviceIds => async dispatch => {
    const deleteDeviceAction = apiActions.devices.removeMany(deviceIds);
    await dispatch(deleteDeviceAction);
    dispatch(internalActions.removeDevices(deviceIds));
  },
  fetchDevices: (limit, offset, orderBy, filter) => async dispatch => {
    const fetchDevicesAction = apiActions.devices.fetch(limit, offset, orderBy, filter);
    const {data: devices, headers} = await dispatch(fetchDevicesAction);
    dispatch(deviceTotalCountActions.setDeviceTotalCount(headers['fiware-total-count']));
    dispatch(internalActions.replaceDevices(devices));
  },
  peekDevices: () => async dispatch => {
    const peekDevicesAction = apiActions.devices.peek();
    const devices = await dispatch(peekDevicesAction);
    dispatch(internalActions.replaceDevices(devices));
  },
  seekDevices: ({deviceItems}) => async dispatch => {
    const seekDevicesAction = apiActions.devices.seek({deviceItems});
    const devices = await dispatch(seekDevicesAction);
    // NOTE: if a device has not been updated it is returned as "{_id}"
    const updatedDevices = _.filter(devices, device => _.size(device) > 1);
    dispatch(internalActions.replaceDevices(updatedDevices)); // NEEDS WORK
  },
  createDevice: ({template}) => async dispatch => {
    const createDeviceAction = apiActions.devices.create({template});
    const device = await dispatch(createDeviceAction);
    dispatch(internalActions.replaceDevice(device));
  },
  updateDevice: ({deviceId, updates}) => async dispatch => {
    const updateDeviceAction = apiActions.devices.update({deviceId, updates});
    const {iotnode} = await dispatch(updateDeviceAction);
    dispatch(internalActions.replaceDevice(iotnode));
  },
};

const defaultState = {};

const reducer = (state = defaultState, action) => {

  switch (action.type) {

    case ACTION_TYPES.dbDevicesReplaceOne: {
      const {device} = action.payload;
      return {...state, [device._id]: device};
    }

    case ACTION_TYPES.dbDevicesRemoveOne: {
      const {deviceId} = action.payload;
      return _.omit(state, deviceId);
    }

    case ACTION_TYPES.dbDevicesRemoveMany: {
      const {deviceIds} = action.payload;
      return _.omit(state, deviceIds);
    }

    case ACTION_TYPES.dbDevicesReplaceMany: {
      const {devices} = action.payload;
      const replacements = {};
      _.each(devices, device => {
        replacements[device._id] = device;
      });
      return {
        ...replacements,
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
