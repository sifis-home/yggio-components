/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// locations.redux.js

import _ from 'lodash';
import {actions as apiActions} from '../api-state.redux';

const ACTION_TYPES = {
  dbLocationsReplaceOne: 'dbLocationsReplaceOne',
  dbLocationsRemoveOne: 'dbLocationsRemoveOne',
  dbLocationsReplaceMany: 'dbLocationsReplaceMany',
};


const internalActions = {

  replaceLocation: location => ({
    type: ACTION_TYPES.dbLocationsReplaceOne,
    payload: {location},
  }),

  removeLocation: locationId => ({
    type: ACTION_TYPES.dbLocationsRemoveOne,
    payload: {locationId},
  }),

  replaceLocations: locations => ({
    type: ACTION_TYPES.dbLocationsReplaceMany,
    payload: {locations},
  }),

};

const actions = {

  createLocation: locationTemplate => async dispatch => {
    const createLocationAction = apiActions.locations.create(locationTemplate);
    const location = await dispatch(createLocationAction);
    dispatch(internalActions.replaceLocation(location));
  },

  fetchLocations: () => async dispatch => {
    const fetchLocationsAction = apiActions.locations.fetch();
    const locations = await dispatch(fetchLocationsAction);
    dispatch(internalActions.replaceLocations(locations));
  },

  getLocation: locationId => async dispatch => {
    const getLocationAction = apiActions.locations.get({locationId});
    const location = await dispatch(getLocationAction);
    dispatch(internalActions.replaceLocation(location));
  },

  updateLocation: updates => async dispatch => {
    const updateLocationAction = apiActions.locations.update(updates);
    const location = await dispatch(updateLocationAction);
    dispatch(internalActions.replaceLocation(location));
  },

  deleteLocation: locationId => async dispatch => {
    const deleteLocationAction = apiActions.locations.remove(locationId);
    await dispatch(deleteLocationAction);
    dispatch(internalActions.removeLocation(locationId));
  },

};

const defaultState = {};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case ACTION_TYPES.dbLocationsReplaceOne: {
      const {location} = action.payload;
      return {...state, [location._id]: location};
    }

    case ACTION_TYPES.dbLocationsRemoveOne: {
      const {locationId} = action.payload;
      return _.omit(state, locationId);
    }

    case ACTION_TYPES.dbLocationsReplaceMany: {
      const {locations} = action.payload;
      const replacements = {};
      _.each(locations, location => {
        replacements[location._id] = location;
      });
      return {
        ...state,
        ...replacements,
      };
    }

    default: {
      return state;
    }
  }
};

export {
  actions,
  reducer,
};
