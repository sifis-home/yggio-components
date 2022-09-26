/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// access-rights.redux.js

import _ from 'lodash';
import {actions as apiActions} from '../api-state.redux';

const ACTION_TYPES = {
  dbAccessRightsReplaceOne: 'dbAccessRightsReplaceOne',
  dbAccessRightsRemoveOne: 'dbAccessRightsRemoveOne',
  dbAccessRightsReplaceMany: 'dbAccessRightsReplaceMany',
  dbAccessRightsReset: 'dbAccessRightsReset',
};


const internalActions = {
  replaceAccessRight: accessRight => ({
    type: ACTION_TYPES.dbAccessRightsReplaceOne,
    payload: {accessRight},
  }),
  removeAccessRight: accessRight => ({
    type: ACTION_TYPES.dbAccessRightsRemoveOne,
    payload: {accessRight},
  }),
  replaceAccessRights: accessRights => ({
    type: ACTION_TYPES.dbAccessRightsReplaceMany,
    payload: {accessRights},
  }),
  resetAccessRights: () => ({
    type: ACTION_TYPES.dbAccessRightsReset,
  }),
};

const actions = {
  fetchAccessRightResource: ({deviceId}) => async dispatch => {
    const getAccessRightAction = apiActions.accessRights.fetchResource({deviceId});
    const accessRights = await dispatch(getAccessRightAction);
    dispatch(internalActions.replaceAccessRights(accessRights));
  },
  fetchAccessRightSubject: ({subjectId}) => async dispatch => {
    const getAccessRightAction = apiActions.accessRights.fetchSubject({subjectId});
    const accessRights = await dispatch(getAccessRightAction);
    dispatch(internalActions.replaceAccessRights(accessRights));
  },
  removeAccessRight: ({deviceId, scope, subjectId, subjectType}) => async dispatch => {
    const accessRight = {
      scope,
      subjectId,
      subjectType,
      resourceId: deviceId,
    };
    const template = {
      deviceId,
      scope,
      subjectId,
      subjectType,
    };
    const removeAccessRightAction = apiActions.accessRights.remove(template);
    await dispatch(removeAccessRightAction);
    dispatch(internalActions.removeAccessRight(accessRight));
  },
  createAccessRight: ({deviceId, template}) => async dispatch => {
    const createAccessRightAction = apiActions.accessRights.create({deviceId, template});
    await dispatch(createAccessRightAction);
    dispatch(internalActions.replaceAccessRight(template));
  },
  resetAccessRights: () => dispatch => {
    dispatch(internalActions.resetAccessRights());
  },
};

const defaultState = {};

const reducer = (state = defaultState, action) => {

  switch (action.type) {

    case ACTION_TYPES.dbAccessRightsReplaceOne: {
      const {accessRight} = action.payload;
      const right = _.find(state, right => _.eq(right.subjectId, accessRight.subjectId));
      const scope = _.get(right, 'scope') || [];
      if (accessRight.subjectId) {
        return {
          ...state,
          [accessRight.subjectId]: {
            ...accessRight,
            scope: _.uniq([...scope, ...accessRight.scope]),
          },
        };
      }

      if (accessRight.resourceId) {
        return {
          ...state,
          [accessRight.resourceId]: {
            ...accessRight,
            scope: _.uniq([...scope, ...accessRight.scope]),
          },
        };
      }
    }

    case ACTION_TYPES.dbAccessRightsRemoveOne: {
      const {accessRight} = action.payload;
      const currentAccessRight = _.find(state, right => _.eq(right.subjectId, accessRight.subjectId));
      const [right] = accessRight.scope;
      if (_.isEmpty(_.without(currentAccessRight.scope, right))) {
        return _.omit(state, accessRight.subjectId);
      }

      return {
        ...state,
        [accessRight.subjectId]: {
          ...currentAccessRight,
          scope: _.without(currentAccessRight.scope, right)
        }
      };
    }

    case ACTION_TYPES.dbAccessRightsReplaceMany: {
      const {accessRights} = action.payload;
      return {
        ...state,
        ..._.reduce(accessRights, (acc, curr) => {
          if (curr.subjectId) {
            acc[curr.subjectId] = curr;
          }
          if (curr.resourceId) {
            acc[curr.resourceId] = curr;
          }
          return acc;
        }, {}),
      };
    }

    case ACTION_TYPES.dbAccessRightsReset: {
      return defaultState;
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
