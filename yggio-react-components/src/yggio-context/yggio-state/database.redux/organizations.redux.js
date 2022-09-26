/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// organizations.redux.js

import _ from 'lodash';
import {organizationUtils} from '../../../utils';
import {actions as apiActions} from '../api-state.redux';

import {internalActions as usersInternalActions} from './users.redux';
import {internalActions as deviceDetailsInteralActions} from './device-details.redux';

const ACTION_TYPES = {
  dbOrganizationsReplaceMany: 'dbOrganizationsReplaceMany',
  dbOrganizationsReplaceOne: 'dbOrganizationsReplaceOne',
  dbOrganizationsUpdateOne: 'dbOrganizationsUpdateOne',
  dbOrganizationsReplaceMembers: 'dbOrganizationsReplaceMembers',
  dbOrganizationsReplaceRootUnit: 'dbOrganizationsReplaceRootUnit',
  dbOrganizationsDeleteUnit: 'dbOrganizationsDeleteUnit',
  dbOrganizationsReplaceAccessTokens: 'dbOrganizationsReplaceAccessTokens',
};


const internalActions = {

  replaceOrganizations: organizations => ({
    type: ACTION_TYPES.dbOrganizationsReplaceMany,
    payload: {organizations},
  }),

  replaceOrganization: organization => ({
    type: ACTION_TYPES.dbOrganizationsReplaceOne,
    payload: {organization},
  }),

  updateOrganization: (orgId, updates) => ({
    type: ACTION_TYPES.dbOrganizationsUpdateOne,
    payload: ({orgId, updates}),
  }),

  replaceMembers: (orgId, members) => ({
    type: ACTION_TYPES.dbOrganizationsReplaceMembers,
    payload: ({orgId, members}),
  }),

  replaceRootUnit: (orgId, rootUnit) => ({
    type: ACTION_TYPES.dbOrganizationsReplaceRootUnit,
    payload: ({orgId, rootUnit}),
  }),

  deleteUnit: (orgId, unitId) => ({
    type: ACTION_TYPES.dbOrganizationsDeleteUnit,
    payload: ({orgId, unitId}),
  }),

  replaceAccessTokens: (orgId, accessTokens) => ({
    type: ACTION_TYPES.dbOrganizationsReplaceAccessTokens,
    payload: ({orgId, accessTokens}),
  }),

};


const actions = {

  fetchOrganizations: () => async dispatch => {
    const fetchOrganizationsAction = apiActions.organizations.fetchOrganizations();
    const organizations = await dispatch(fetchOrganizationsAction);
    dispatch(internalActions.replaceOrganizations(organizations));
  },

  createOrganization: ({template}) => async dispatch => {
    const createOrganizationAction = apiActions.organizations.createOrganization({template});
    const organization = await dispatch(createOrganizationAction);
    dispatch(internalActions.replaceOrganization(organization));
  },

  getOrganization: ({orgId}) => async dispatch => {
    const getOrganizationAction = apiActions.organizations.getOrganization({orgId});
    const organization = await dispatch(getOrganizationAction);
    dispatch(internalActions.replaceOrganization(organization));
  },

  updateOrganization: ({orgId, template}) => async dispatch => {
    const updateOrganizationAction = apiActions.organizations.updateOrganization({orgId, template});
    const organization = await dispatch(updateOrganizationAction);
    dispatch(internalActions.updateOrganization(orgId, organization));
  },

  createUnit: ({orgId, parentUnitId, template}) => async dispatch => {
    const createUnitAction = apiActions.organizations.createUnit({orgId, parentUnitId, template});
    const {rootUnit} = await dispatch(createUnitAction);
    dispatch(internalActions.replaceRootUnit(orgId, rootUnit));
  },

  deleteUnit: ({orgId, unitId}) => async dispatch => {
    const deleteUnitAction = apiActions.organizations.deleteUnit({orgId, unitId});
    await dispatch(deleteUnitAction);
    dispatch(internalActions.deleteUnit(orgId, unitId));
  },

  updateUnit: ({orgId, unitId, template}) => async dispatch => {
    const updateUnitAction = apiActions.organizations.updateUnit({orgId, unitId, template});
    const {rootUnit} = await dispatch(updateUnitAction);
    dispatch(internalActions.replaceRootUnit(orgId, rootUnit));
  },

  createMember: ({orgId, template}) => async dispatch => {
    const createMemberAction = apiActions.organizations.createMember({orgId, template});
    const res = await dispatch(createMemberAction);
    dispatch(internalActions.replaceMembers(orgId, res.members));
    dispatch(usersInternalActions.replaceUser(res.member));
  },

  fetchMembers: ({orgId}) => async dispatch => {
    const fetchMembersAction = apiActions.organizations.fetchMembers({orgId});
    const res = await dispatch(fetchMembersAction);
    dispatch(usersInternalActions.replaceUsers(res.members));
  },

  moveMember: ({orgId, memberId, unitId}) => async dispatch => {
    const moveMemberAction = apiActions.organizations.moveMember({orgId, memberId, unitId});
    const {accessTokens} = await dispatch(moveMemberAction);
    dispatch(internalActions.replaceAccessTokens(orgId, accessTokens));
  },

  fetchDeviceDetails: ({orgId}) => async dispatch => {
    const fetchDeviceDetailsAction = apiActions.organizations.fetchDeviceDetails({orgId});
    const res = await dispatch(fetchDeviceDetailsAction);
    dispatch(deviceDetailsInteralActions.replaceDeviceDetails(res.deviceDetails));
  },

  assignManagerAccess: ({orgId, memberId, unitId}) => async dispatch => {
    const assignManagerAccessAction = apiActions.organizations.assignManagerAccess({
      orgId,
      memberId,
      unitId,
    });
    const {accessTokens} = await dispatch(assignManagerAccessAction);
    dispatch(internalActions.replaceAccessTokens(orgId, accessTokens));
  },

  revokeManagerAccess: ({orgId, memberId, unitId}) => async dispatch => {
    const revokeManagerAccessAction = apiActions.organizations.revokeManagerAccess({
      orgId,
      memberId,
      unitId,
    });
    const {accessTokens} = await dispatch(revokeManagerAccessAction);
    dispatch(internalActions.replaceAccessTokens(orgId, accessTokens));
  },

  assignDeviceAccess: ({orgId, memberId, unitId, accessType}) => async dispatch => {
    const assignDeviceAccessAction = apiActions.organizations.assignDeviceAccess({
      orgId,
      memberId,
      unitId,
      accessType,
    });
    const {accessTokens} = await dispatch(assignDeviceAccessAction);
    dispatch(internalActions.replaceAccessTokens(orgId, accessTokens));
  },

  // {orgId, memberId, unitId, accessType}
  revokeDeviceAccess: ({orgId, memberId, unitId, accessType}) => async dispatch => {
    const revokeDeviceAccessAction = apiActions.organizations.revokeDeviceAccess({
      orgId,
      memberId,
      unitId,
      accessType,
    });
    const {accessTokens} = await dispatch(revokeDeviceAccessAction);
    dispatch(internalActions.replaceAccessTokens(orgId, accessTokens));
  },

};

const defaultState = {};

const reducer = (state = defaultState, action) => {
  switch (action.type) {

    case ACTION_TYPES.dbOrganizationsReplaceMany: {
      const {organizations} = action.payload;
      const replacements = {};
      _.each(organizations, organization => {
        replacements[organization._id] = organization;
      });
      return {
        ...state,
        ...replacements,
      };
    }

    case ACTION_TYPES.dbOrganizationsReplaceOne: {
      const {organization} = action.payload;
      return {
        ...state,
        [organization._id]: organization,
      };
    }

    case ACTION_TYPES.dbOrganizationsUpdateOne: {
      const {orgId, updates} = action.payload;
      const prev = _.get(state, orgId, {});
      return {
        ...state,
        [orgId]: {
          ...prev,
          ...updates,
        },
      };
    }

    case ACTION_TYPES.dbOrganizationsReplaceMembers: {
      const {orgId, members} = action.payload;
      const prev = _.get(state, orgId, {});
      return {
        ...state,
        [orgId]: {
          ...prev,
          members,
        },
      };
    }

    case ACTION_TYPES.dbOrganizationsReplaceRootUnit: {
      const {orgId, rootUnit} = action.payload;
      const prev = _.get(state, orgId, {});
      return {
        ...state,
        [orgId]: {
          ...prev,
          rootUnit,
        },
      };
    }

    case ACTION_TYPES.dbOrganizationsReplaceAccessTokens: {
      const {orgId, accessTokens} = action.payload;
      const prev = _.get(state, orgId, {});
      return {
        ...state,
        [orgId]: {
          ...prev,
          accessTokens,
        },
      };
    }

    // this one is kind of heavy since delete route does not return data
    case ACTION_TYPES.dbOrganizationsDeleteUnit: {
      const {orgId, unitId} = action.payload;
      const prevOrg = _.get(state, orgId);
      if (!prevOrg) {
        return state;
      }
      const {unit, unitPath, descendants} = organizationUtils.decomposeUnit(prevOrg, unitId);
      if (!unit) {
        return state;
      }
      const removedUnitIds = _.concat(_.map(descendants, descendant => descendant._id), unitId);
      const accessTokens = _.filter(prevOrg.accessTokens, accessToken => {
        const isKept = !_.includes(removedUnitIds, accessToken.unitId);
        return isKept;
      });
      const {rootUnit} = organizationUtils.replaceUnit(prevOrg, unitPath, null);
      return {
        ...state,
        [orgId]: {
          ...prevOrg,
          accessTokens,
          rootUnit,
        },
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
