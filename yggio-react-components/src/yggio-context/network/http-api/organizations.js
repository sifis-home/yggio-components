/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// organizations.js

import request from '../http-request';

import {
  REQUEST_METHODS,
  RESOURCE_TYPES,
} from '../../../constants';

const fetchOrganizations = token => () => request({
  token,
  method: REQUEST_METHODS.get,
  URI: `${RESOURCE_TYPES.organizations}`,
});

const createOrganization = token => ({template}) => request({
  token,
  method: REQUEST_METHODS.post,
  URI: `${RESOURCE_TYPES.organizations}`,
  data: template,
});

const getOrganization = token => ({orgId}) => request({
  token,
  method: REQUEST_METHODS.get,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}`,
});

const updateOrganization = token => ({orgId, template}) => request({
  token,
  method: REQUEST_METHODS.put,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}`,
  data: template,
});

const createUnit = token => ({orgId, parentUnitId, template}) => request({
  token,
  method: REQUEST_METHODS.post,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/units/${parentUnitId}`,
  data: template,
});

const deleteUnit = token => ({orgId, unitId}) => request({
  token,
  method: REQUEST_METHODS.delete,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/units/${unitId}`,
});

const updateUnit = token => ({orgId, unitId, template}) => request({
  token,
  method: REQUEST_METHODS.put,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/units/${unitId}`,
  data: template,
});

const createMember = token => ({orgId, template}) => request({
  token,
  method: REQUEST_METHODS.post,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/members`,
  data: template,
});

const fetchMembers = token => ({orgId}) => request({
  token,
  method: REQUEST_METHODS.get,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/members`,
});

const moveMember = token => ({orgId, memberId, unitId}) => request({
  token,
  method: REQUEST_METHODS.put,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/members/${memberId}/units/${unitId}`,
});

const fetchDeviceDetails = token => async ({orgId}) => request({
  token,
  method: REQUEST_METHODS.get,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/deviceDetails`,
});

const assignManagerAccess = token => ({orgId, memberId, unitId}) => request({
  token,
  method: REQUEST_METHODS.post,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/members/${memberId}/units/${unitId}/managers`,
});

const revokeManagerAccess = token => ({orgId, memberId, unitId}) => request({
  token,
  method: REQUEST_METHODS.delete,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/members/${memberId}/units/${unitId}/managers`,
});

const assignDeviceAccess = token => ({orgId, memberId, unitId, accessType}) => request({
  token,
  method: REQUEST_METHODS.post,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/members/${memberId}/units/${unitId}/deviceTokens`,
  data: {accessType},
});

const revokeDeviceAccess = token => ({orgId, memberId, unitId, accessType}) => request({
  token,
  method: REQUEST_METHODS.delete,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/members/${memberId}/units/${unitId}/deviceTokens`,
  data: {accessType},
});

export {
  getOrganization,
  fetchOrganizations,
  createOrganization,
  updateOrganization,
  createUnit,
  deleteUnit,
  updateUnit,
  createMember,
  fetchMembers,
  moveMember,
  fetchDeviceDetails,
  assignManagerAccess,
  revokeManagerAccess,
  assignDeviceAccess,
  revokeDeviceAccess,
};
