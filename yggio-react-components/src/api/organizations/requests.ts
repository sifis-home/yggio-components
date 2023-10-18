import {request} from '../request';
import {HTTP_METHODS, RESOURCE_TYPES} from '../../constants';
import {
  Organization,
  OrganizationUnit,
  Organizations,
  DeviceDetail,
} from '../../types';

const fetch = async () => request<Organizations>({
  method: HTTP_METHODS.get,
  URI: RESOURCE_TYPES.organizations,
});

const fetchOne = async (orgId: string) => request<Organization>({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}`,
});

const create = async (data: Organization) => request<Organization>({
  method: HTTP_METHODS.post,
  URI: RESOURCE_TYPES.organizations,
  data,
});

interface UpdateTemplate {
  orgId: string;
  updates: Pick<Organization, 'name' | 'description'>;
}

const update = async ({orgId, updates}: UpdateTemplate) => request<Organization>({
  method: HTTP_METHODS.put,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}`,
  data: updates,
});


interface RemovalTemplate {
  orgId: string;
  unitId: string;
}

const remove = async ({orgId, unitId}: RemovalTemplate) => request({
  method: HTTP_METHODS.delete,
  URI: RESOURCE_TYPES.organizations,
  params: {orgId, unitId},
});

interface CreateUnitTemplate {
  orgId: string;
  parentUnitId: string;
  template: Pick<OrganizationUnit, 'name' | 'description'>;
}

const createUnit = async ({orgId, parentUnitId, template}: CreateUnitTemplate) => request({
  method: HTTP_METHODS.post,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/units/${parentUnitId}`,
  data: template,
});

interface UpdateUnitTemplate {
  orgId: string;
  unitId: string;
  template: Pick<OrganizationUnit, 'name' | 'description'>;
}

const updateUnit = async ({orgId, unitId, template}: UpdateUnitTemplate) => request({
  method: HTTP_METHODS.put,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/units/${unitId}`,
  data: template,
});

const deleteUnit = async ({orgId, unitId}: {orgId: string, unitId: string}) => request({
  method: HTTP_METHODS.delete,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/units/${unitId}`,
});

const createMember = async ({orgId, updates}: UpdateTemplate) => request({
  method: HTTP_METHODS.post,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/members`,
  data: updates,
});

const fetchMembers = async ({orgId}: {orgId: string}) => request({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/members`,
});

interface IdTemplate {
  orgId: string;
  memberId: string;
  unitId: string;
}

const moveMember = async ({orgId, memberId, unitId}: IdTemplate) => request({
  method: HTTP_METHODS.put,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/members/${memberId}/units/${unitId}`,
});

const fetchDeviceDetails = async ({
  orgId
}: {orgId: string}) => request<{deviceDetails: DeviceDetail[]}>({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/deviceDetails`,
});

const assignManagerAccess = async ({orgId, memberId, unitId}: IdTemplate) => request({
  method: HTTP_METHODS.post,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/members/${memberId}/units/${unitId}/managers`,
});

const revokeManagerAccess = async ({orgId, memberId, unitId}: IdTemplate) => request({
  method: HTTP_METHODS.delete,
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
  method: HTTP_METHODS.post,
  URI: `${RESOURCE_TYPES.organizations}/${orgId}/members/${memberId}/units/${unitId}/deviceTokens`,
  data: {accessType},
});

const revokeDeviceAccess = async ({
  orgId,
  memberId,
  unitId,
  accessType,
}: AccessTypeTemplate) => request({
  method: HTTP_METHODS.delete,
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
  updateUnit,
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
