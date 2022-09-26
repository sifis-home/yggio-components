/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {set, pick, get, omit} from 'lodash/fp';
import {LOCATION} from '../../../constants';
import {createReducer} from '../../../utils';

const LOCATION_SET = 'LOCATION_SET';
const LOCATION_SET_DEVICE_IS_REMOVING = 'LOCATION_SET_DEVICE_IS_REMOVING';
const LOCATION_SET_DEVICE_PLACEMENT_MODE = 'LOCATION_SET_DEVICE_PLACEMENT_MODE';
// size listener effectively
const XYZ_LAYER_RESIZE_BG = 'XYZ_LAYER_RESIZE_BG';
// geometry
const XYZ_LAYER_SET_GEOMETRY = 'XYZ_LAYER_SET_GEOMETRY';
const XYZ_LAYER_RESET_GEOMETRY = 'XYZ_LAYER_RESET_GEOMETRY';
// moving device
const XYZ_LAYER_BEGIN_MOVING_DEVICE = 'XYZ_LAYER_BEGIN_MOVING_DEVICE';
const XYZ_LAYER_END_MOVING_DEVICE = 'XYZ_LAYER_END_MOVING_DEVICE';
const XYZ_LAYER_UPDATE_MOVING_DEVICE = 'XYZ_LAYER_UPDATE_MOVING_DEVICE';
const DEVICE_OPEN_POPUP = 'DEVICE_OPEN_POPUP';
const DEVICE_CLOSE_POPUP = 'DEVICE_CLOSE_POPUP';
const VIEWS_REPORT_IMAGE_SIZE = 'VIEWS_REPORT_IMAGE_SIZE';
const SHOW_VALUE_DISPLAY = 'SHOW_VALUE_DISPLAY';
const TOGGLE_LAYER = 'TOGGLE_LAYER';

const actions = {
  setDevicePlacementMode: isInDevicePlacementMode => ({
    type: LOCATION_SET_DEVICE_PLACEMENT_MODE,
    isInDevicePlacementMode,
  }),
  setIsRemovingDevice: isRemovingDevice => ({
    type: LOCATION_SET_DEVICE_IS_REMOVING,
    isRemovingDevice,
  }),
  // should be moved up?
  resizeBackground: rect => ({
    type: XYZ_LAYER_RESIZE_BG,
    rect,
  }),
  // in general use
  setLayerGeometry: (layerId, geometry) => ({
    type: XYZ_LAYER_SET_GEOMETRY,
    layerId,
    layerGeometries: pick(['x', 'y', 'scale'], geometry),
  }),
  reportImageSize: (imageSrc, size) => ({
    type: VIEWS_REPORT_IMAGE_SIZE,
    imageSrc,
    size,
  }),
  // used by blueprint reset button
  resetLayerGeometry: layerId => ({
    type: XYZ_LAYER_RESET_GEOMETRY,
    layerId,
  }),
  // moving deviceItem stuff
  beginMovingDeviceItem: deviceItem => ({
    type: XYZ_LAYER_BEGIN_MOVING_DEVICE,
    deviceItem,
  }),
  endMovingDeviceItem: () => ({
    type: XYZ_LAYER_END_MOVING_DEVICE,
  }),
  updateMovingDeviceItem: (location, deviceItemId, updates) => ({
    type: XYZ_LAYER_UPDATE_MOVING_DEVICE,
    location,
    deviceItemId,
    updates,
  }),
    // const modifiedLocation = editDeviceItemDetails(location, deviceItemId, updates);
    // return dispatch(locationActions.updateLocation(modifiedLocation));
  showValueDisplay: (location, deviceItemId, updates) => dispatch => {
    const modifiedLocation = editDeviceItemDetails(location, deviceItemId, updates);
    return dispatch(locationActions.updateLocation(modifiedLocation));
  },
  openDevicePopup: popupDeviceId => ({
    type: DEVICE_OPEN_POPUP,
    popupDeviceId,
  }),
  closeDevicePopup: () => ({
    type: DEVICE_CLOSE_POPUP,
  }),
  toggleLayer: (layerId) => ({
    type: TOGGLE_LAYER,
    layerId,
  }),
};

const defaultState = {
  isRemovingDevice: false,
  isInDevicePlacementMode: false,
  // backgroundDimensions: the actual dimensions of the physical background area
  backgroundDimensions: {width: 0, height: 0, left: 0, top: 0},
  // blueprintGeometries: keep track of pan & zoom info for each blueprint
  layerGeometries: {},
  // moving deviceItem (There can be only one. seriously.)
  movingDeviceItem: null,
  popupDeviceId: null,
  imageSizes: {},
  openedLayers: {},
};

const handlers = {
  [LOCATION_SET]: (state, {location}) =>
    set('location', location, state),

  [LOCATION_SET_DEVICE_IS_REMOVING]: (state, {isRemovingDevice}) =>
    set('isRemovingDevice', isRemovingDevice, state),

  [LOCATION_SET_DEVICE_PLACEMENT_MODE]: (state, {isInDevicePlacementMode}) =>
    set('isInDevicePlacementMode', isInDevicePlacementMode, state),

  [XYZ_LAYER_RESIZE_BG]: (state, {rect}) => {
    const dims = pick(['width', 'height', 'top', 'left'], rect);
    return set('backgroundDimensions', dims, state);
  },

  [XYZ_LAYER_SET_GEOMETRY]: (state, {layerId, layerGeometries}) => {
    const geometries = {
      ...state.layerGeometries,
      [layerId]: {
        ...get({}, layerId, state.layerGeometries),
        ...layerGeometries,
      },
    };
    return set('layerGeometries', geometries, state);
  },

  [XYZ_LAYER_RESET_GEOMETRY]: (state, {layerId}) => {
    const geometries = omit([layerId], state.layerGeometries);
    return set('layerGeometries', geometries, state);
  },

  [XYZ_LAYER_BEGIN_MOVING_DEVICE]: (state, {deviceItem}) =>
    set('movingDeviceItem', deviceItem, state),

  [XYZ_LAYER_END_MOVING_DEVICE]: (state) => (
    set('movingDeviceItem', null, state)
  ),

  [XYZ_LAYER_UPDATE_MOVING_DEVICE]: (state, {updates}) => {
    const movingDeviceItem = {
      ...state.movingDeviceItem,
      ...pick(LOCATION.deviceItemSimpleEditProps, updates),
    };
    return !state.movingDeviceItem
      ? state
      : set('movingDeviceItem', movingDeviceItem, state);
  },

  [DEVICE_OPEN_POPUP]: (state, {popupDeviceId}) =>
    set('popupDeviceId', popupDeviceId, state),
  [DEVICE_CLOSE_POPUP]: (state) =>
    set('popupDeviceId', null, state),

  [VIEWS_REPORT_IMAGE_SIZE]: (state, {imageSrc, size}) => {
    const imageSizes = {
      ...state.imageSizes,
      [imageSrc]: {...size},
    };
    return set('imageSizes', imageSizes, state)
  },
  [TOGGLE_LAYER]: (state, {layerId}) =>
    set('openedLayers', {...state.openedLayers, [layerId]: !state.openedLayers[layerId]}, state),
};

const reducer = createReducer(defaultState, handlers);

export default {
  actions,
  defaultState,
  reducer,
};
