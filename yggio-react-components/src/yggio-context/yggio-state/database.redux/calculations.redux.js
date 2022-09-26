/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// calculations.redux.js

import _ from 'lodash';
import {actions as apiActions} from '../api-state.redux';
import {internalActions as internalDeviceActions} from './devices.redux';

const ACTION_TYPES = {
  dbCalculationsReplaceOne: 'dbCalculationsReplaceOne',
  dbCalculationsRemoveOne: 'dbCalculationsRemoveOne',
  dbCalculationsReplaceMany: 'dbCalculationsReplaceMany',
};


const internalActions = {
  replaceCalculation: calculation => ({
    type: ACTION_TYPES.dbCalculationsReplaceOne,
    payload: {calculation},
  }),

  removeCalculation: calculationId => ({
    type: ACTION_TYPES.dbCalculationsRemoveOne,
    payload: {calculationId},
  }),

  replaceCalculations: calculations => ({
    type: ACTION_TYPES.dbCalculationsReplaceMany,
    payload: {calculations},
  }),
};

const actions = {
  createCalculation: (calculationTemplate, {template, type, automaticUpdate}) => async dispatch => {
    if (type === 'createNewDevice') {
      const createDeviceAction = apiActions.devices.create({template});
      const created = await dispatch(createDeviceAction);
      const findDeviceAction = apiActions.devices.get({deviceId: created._id});
      const device = await dispatch(findDeviceAction);
      calculationTemplate.destination.mongoId = device._id;
      dispatch(internalDeviceActions.replaceDevice(device));
    }
    if (automaticUpdate) {
      const deviceItems = _.map(calculationTemplate.sources, 'sourceId');
      const seekDevicesAction = apiActions.devices.seek({deviceItems});
      const devices = await dispatch(seekDevicesAction);
      const updatedSources = _.map(calculationTemplate.sources, async source => {
        const device = _.find(devices, device => device._id === source.sourceId);
        const updates = {
          rabbitRouting: {
            value: _.uniq([
              ...device.rabbitRouting.value,
              'calculator',
              'receiver',
            ]),
          }
        };
        const updateDeviceAction = apiActions.devices.update({updates, deviceId: source.sourceId});
        const result = await dispatch(updateDeviceAction);
        return result;
      });
      await Promise.all(updatedSources);
    }

    const createCalculationAction = apiActions.calculations.create(calculationTemplate);
    const calculation = await dispatch(createCalculationAction);
    dispatch(internalActions.replaceCalculation(calculation));
  },

  fetchCalculations: () => async dispatch => {
    const fetchCalculationsAction = apiActions.calculations.fetch();
    const calculations = await dispatch(fetchCalculationsAction);
    dispatch(internalActions.replaceCalculations(calculations));
  },

  getCalculation: calculationId => async dispatch => {
    const getCalculationAction = apiActions.calculations.get(calculationId);
    const calculation = await dispatch(getCalculationAction);
    dispatch(internalActions.replaceCalculation(calculation));
  },

  updateCalculation: updates => async dispatch => {
    const updateCalculationAction = apiActions.calculations.update(updates);
    const calculation = await dispatch(updateCalculationAction);
    dispatch(internalActions.replaceCalculation(calculation));
  },

  deleteCalculation: calculationId => async dispatch => {
    const deleteCalculationAction = apiActions.calculations.remove(calculationId);
    await dispatch(deleteCalculationAction);
    dispatch(internalActions.removeCalculation(calculationId));
  },
  performCalculation: ({calculation, device}) => async dispatch => {
    const {calculation: {calcType, interval}} = calculation;
    const performCalculationAction = apiActions.calculations.perform(calculation._id, calcType, interval);
    const calculationResult = await dispatch(performCalculationAction);
    const updates = {
      [calculation.destination.path]: calculationResult.result,
    };
    const updateDeviceAction = apiActions.devices.update({deviceId: device._id, updates});
    dispatch(updateDeviceAction);
  },
};

const defaultState = {};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case ACTION_TYPES.dbCalculationsReplaceOne: {
      const {calculation} = action.payload;
      return {...state, [calculation._id]: calculation};
    }

    case ACTION_TYPES.dbCalculationsRemoveOne: {
      const {calculationId} = action.payload;
      return _.omit(state, calculationId);
    }

    case ACTION_TYPES.dbCalculationsReplaceMany: {
      const {calculations} = action.payload;
      const replacements = {};
      _.each(calculations, calculation => {
        replacements[calculation._id] = calculation;
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
