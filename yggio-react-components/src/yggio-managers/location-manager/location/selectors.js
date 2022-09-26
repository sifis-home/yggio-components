/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {
  compose,
  get,
  size,
  map,
  eq,
  getOr,
  find,
  filter,
  includes,
  toLower,
  isNumber,
  concat,
} from 'lodash/fp';
import _ from 'lodash';
import {createSelector} from 'reselect';

const selectCurrentLocation = createSelector(
  props => props.locations,
  props => props.locationId,
  (locations, locationId) => (
    locations[locationId]
  )
);

const layerGeometrySelector = createSelector(
  props => props.layerId,
  props => props.layerGeometries,
  (layerId, geometries) => geometries[layerId] || {scale: 1, x: 0, y: 0}
);

const selectedLayerSelector = createSelector(
  selectCurrentLocation,
  props => props.layerId,
  (location, layerId) => {
    const layers = concat(
      getOr([], 'defaultLayer', location),
      getOr([], 'layers', location),
    );
    const selectedLayer = _.find(layers, layer => layer._id === layerId);
    return selectedLayer;
  }
);

const placedItemsSelector = createSelector(
  selectedLayerSelector,
  props => props.movingDeviceItem,
  (selectedLayer, movingDeviceItem) => {
    const placementsInProcess = false;

    const checkMovementInProgress = items => {
      if (!movingDeviceItem) {
        return items;
      }

      return map(item => {
        const id = get('_id', movingDeviceItem);
        const isMatch = eq(item._id, id);
        return !isMatch ? item : movingDeviceItem;
      }, items);
    };

    const checkPlacementInProgress = items => {
      if (!size(placementsInProcess)) {
        return items;
      }

      return map(item => {
        const placement = find({_id: item._id}, placementsInProcess);
        return !placement ? item : placement;
      }, items);
    };

    const deviceItems = compose(
      checkMovementInProgress,
      checkPlacementInProgress,
      getOr([], 'items'),
    )(selectedLayer);
    const validDevices = filter(item => (
      isNumber(item.left) && isNumber(item.top)
    ), deviceItems);


    return filter(device => includes(toLower(''), toLower(device.name)), validDevices);
  }
);

const selectLayers = createSelector(
  selectCurrentLocation,
  (location) => (
    concat(
      getOr([], 'defaultLayer', location),
      getOr([], 'layers', location),
    )
  )
);

export default {
  currentLocation: selectCurrentLocation,
  layerGeometry: layerGeometrySelector,
  placedItems: placedItemsSelector,
  selectedLayer: selectedLayerSelector,
  layers: selectLayers,
};
