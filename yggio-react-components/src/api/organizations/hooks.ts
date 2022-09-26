/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {useQuery, useMutation, QueryClient} from '@tanstack/react-query';
import {Organization} from '../../types';
import {organizationsRequests} from '.';

const useOrganizationsQuery = () => useQuery(
  ['organizations'],
  async () => organizationsRequests.fetch(),
);

interface IdTemplate {
  orgId: string;
  unitId: string;
}

const useOrganizationQuery = (orgId: string) => (
  useQuery(
    ['organizations'],
    async () => organizationsRequests.fetchOne(orgId),
    {
      keepPreviousData: true,
    }
  )
);

const useCreateOrganization = (queryClient: QueryClient) => useMutation(
  async (data: Organization) => organizationsRequests.create(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['organizations']);
    }
  }
);

interface UpdateTemplate {
  orgId: string;
  updates: Partial<Organization>;
}

const useUpdateOrganization = (queryClient: QueryClient) => useMutation(
  async ({orgId, updates}: UpdateTemplate) => organizationsRequests.update({orgId, updates}),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['organizations']);
      await queryClient.invalidateQueries(['organizations', 'unit']);
      await queryClient.invalidateQueries(['organizations', 'members']);
      await queryClient.invalidateQueries(['organizations', 'managers']);
    }
  }
);

const useRemoveOrganization = (queryClient: QueryClient) => useMutation(
  async ({orgId, unitId}: IdTemplate) => organizationsRequests.remove({orgId, unitId}),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['organizations']);
      await queryClient.invalidateQueries(['organizations', 'unit']);
      await queryClient.invalidateQueries(['organizations', 'members']);
      await queryClient.invalidateQueries(['organizations', 'managers']);
    }
  }
);

interface UnitTemplate {
  orgId: string;
  parentUnitId: string;
  template: Partial<Organization>;
}

const useCreateOrganizationUnit = (queryClient: QueryClient) => useMutation(
  async (data: UnitTemplate) => organizationsRequests.createUnit(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['organizations', 'unit']);
    }
  }
);

const useDeleteOrganizationUnit = (queryClient: QueryClient) => useMutation(
  async (data: IdTemplate) => organizationsRequests.deleteUnit(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['organizations', 'unit']);
    }
  }
);

const useCreateOrganizationMember = (queryClient: QueryClient) => useMutation(
  async (data: UpdateTemplate) => organizationsRequests.createMember(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['organizations', 'members']);
    }
  }
);

const useOrganizationsMembersQuery = ({orgId}: {orgId: string}) => useQuery(
  ['organizations', 'members'],
  async () => organizationsRequests.fetchMembers({orgId}),
);

interface MemberIdTemplate extends IdTemplate {
  memberId: string;
}

const useMoveOrganizationMember = (queryClient: QueryClient) => useMutation(
  async (data: MemberIdTemplate) => organizationsRequests.moveMember(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['organizations', 'members']);
    }
  }
);

const useOrganizationsDeviceQuery = ({orgId}: {orgId: string}) => useQuery(
  ['organizations', 'devices'],
  async () => organizationsRequests.fetchDeviceDetails({orgId}),
);

const useAssignManagerAccess = (queryClient: QueryClient) => useMutation(
  async (data: MemberIdTemplate) => organizationsRequests.assignManagerAccess(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['organizations', 'managers']);
    }
  }
);

const useRevokeManagerAccess = (queryClient: QueryClient) => useMutation(
  async (data: MemberIdTemplate) => organizationsRequests.assignManagerAccess(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['organizations', 'managers']);
    }
  }
);

export {
  useOrganizationsQuery,
  useOrganizationQuery,
  useCreateOrganization,
  useUpdateOrganization,
  useRemoveOrganization,

  useCreateOrganizationUnit,
  useDeleteOrganizationUnit,
  useCreateOrganizationMember,
  useOrganizationsMembersQuery,
  useMoveOrganizationMember,
  useOrganizationsDeviceQuery,
  useAssignManagerAccess,
  useRevokeManagerAccess,
};
