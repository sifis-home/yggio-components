/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {actions as apiActions} from '../api-state.redux';

const ACTION_TYPES = {
  dbJobsReplaceOne: 'dbJobsReplaceOne',
  dbJobsReset: 'dbJobsReset',
};

const internalActions = {
  replaceJob: job => ({
    type: ACTION_TYPES.dbJobsReplaceOne,
    payload: {job},
  }),
  resetJobs: () => ({
    type: ACTION_TYPES.dbJobsReset,
  }),
};

const actions = {
  getJob: ({jobId}) => async dispatch => {
    const getJobAction = apiActions.jobs.get({jobId});
    const job = await dispatch(getJobAction);
    dispatch(internalActions.replaceJob(job));
  },
  batchCreateDevices: ({template}) => async dispatch => {
    const batchCreateDevicesAction = apiActions.devices.batchCreate({template});
    const job = await dispatch(batchCreateDevicesAction);
    dispatch(internalActions.replaceJob(job));
  },
  resetJobs: () => async dispatch => {
    dispatch(internalActions.resetJobs());
  },
};

const defaultState = {};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case ACTION_TYPES.dbJobsReplaceOne: {
      const {job} = action.payload;
      return {...state, [job._id]: job};
    }

    case ACTION_TYPES.dbJobsReset: {
      return defaultState;
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
