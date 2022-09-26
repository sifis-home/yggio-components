/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {request} from '../request';
import {HTTP_METHODS, RESOURCE_TYPES} from '../../constants';
import {
  Organization,
  Organizations,
} from '../../types';

const fetch = async () => request<Organizations>({
  method: HTTP_METHODS.Get,
  URI: RESOURCE_TYPES.organizations,
});

const fetchOne = async (orgId: string) => request<Organization>({
  method: HTTP_METHODS.Get,
  URI: RESOURCE_TYPES.organizations,
  params: {orgId},
});

const create = async (data: Organization) => request<Organization>({
  method: HTTP_METHODS.Post,
  URI: RESOURCE_TYPES.organizations,
  data,
});

interface UpdateTemplate {
  orgId: string;
  updates: Partial<Organization>;
}

const update = async ({orgId, updates}: UpdateTemplate) => request<Organization>({
  method: HTTP_METHODS.Put,
  URI: RESOURCE_TYPES.organizations,
  params: {orgId},
  data: updates,
});


interface RemovalTemplate {
  orgId: string;
  unitId: string;
}

const remove = async ({orgId, unitId}: RemovalTemplate) => request({
  method: HTTP_METHODS.Delete,
  URI: RESOURCE_TYPES.organizations,
  params: {orgId, unitId},
});

interface UnitTemplate {
  orgId: string;
  parentUnitId: string;
  template: Partial<Organization>;
}

const createUnit = async ({orgId, parentUnitId, template}: UnitTemplate) => request({
  method: HTTP_METHODS.Post,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/units/${parentUnitId}`,
  data: template,
});

const deleteUnit = async ({orgId, unitId}: {orgId: string, unitId: string}) => request({
  method: HTTP_METHODS.Delete,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/units/${unitId}`,
});

const createMember = async ({orgId, updates}: UpdateTemplate) => request({
  method: HTTP_METHODS.Post,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/members`,
  data: updates,
});

const fetchMembers = async ({orgId}: {orgId: string}) => request({
  method: HTTP_METHODS.Get,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/members`,
});

interface IdTemplate {
  orgId: string;
  memberId: string;
  unitId: string;
}

const moveMember = async ({orgId, memberId, unitId}: IdTemplate) => request({
  method: HTTP_METHODS.Put,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/members/${memberId}/units/${unitId}`,
});

const fetchDeviceDetails = async ({orgId}: {orgId: string}) => request({
  method: HTTP_METHODS.Get,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/deviceDetails`,
});

const assignManagerAccess = async ({orgId, memberId, unitId}: IdTemplate) => request({
  method: HTTP_METHODS.Post,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/members/${memberId}/units/${unitId}/managers`,
});

const revokeManagerAccess = async ({orgId, memberId, unitId}: IdTemplate) => request({
  method: HTTP_METHODS.Delete,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/members/${memberId}/units/${unitId}/managers`,
});

interface AccessTypeTemplate extends IdTemplate {
  accessType: string;
}

const assignDeviceAccess = async ({
  orgId,
  memberId,
  unitId,
  accessType,
}: AccessTypeTemplate) => request({
  method: HTTP_METHODS.Post,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/members/${memberId}/units/${unitId}/deviceTokens`,
  data: {accessType},
});

const revokeDeviceAccess = async ({
  orgId,
  memberId,
  unitId,
  accessType,
}: AccessTypeTemplate) => request({
  method: HTTP_METHODS.Delete,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/members/${memberId}/units/${unitId}/deviceTokens`,
  data: {accessType},
});

export {
  fetch,
  fetchOne,
  create,
  update,
  remove,
  createUnit,
  deleteUnit,
  createMember,
  fetchMembers,
  moveMember,
  fetchDeviceDetails,
  assignDeviceAccess,
  revokeDeviceAccess,
  assignManagerAccess,
  revokeManagerAccess,
};
