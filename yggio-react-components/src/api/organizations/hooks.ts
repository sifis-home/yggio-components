/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {useQuery, useMutation, QueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {toast} from 'react-hot-toast';
import {Organization, OrganizationUnit} from '../../types';
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
    ['organization', orgId],
    async () => organizationsRequests.fetchOne(orgId),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
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
  updates: Pick<Organization, 'name' | 'description'>;
}

const useUpdateOrganization = (queryClient: QueryClient) => useMutation(
  async ({orgId, updates}: UpdateTemplate) => organizationsRequests.update({orgId, updates}),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['organization']);
    }
  }
);

const useRemoveOrganization = (queryClient: QueryClient) => useMutation(
  async ({orgId, unitId}: IdTemplate) => organizationsRequests.remove({orgId, unitId}),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['organizations']);
      await queryClient.invalidateQueries(['organization']);
    }
  }
);

interface CreateUnitTemplate {
  orgId: string;
  parentUnitId: string;
  template: Pick<OrganizationUnit, 'name' | 'description'>;
}

const useCreateOrganizationUnit = (queryClient: QueryClient) => useMutation(
  async (data: CreateUnitTemplate) => organizationsRequests.createUnit(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['organization']);
    }
  }
);


interface UpdateUnitTemplate {
  orgId: string;
  unitId: string;
  template: Pick<OrganizationUnit, 'name' | 'description'>;
}

const useUpdateOrganizationUnit = (queryClient: QueryClient) => useMutation(
  async (data: UpdateUnitTemplate) => organizationsRequests.updateUnit(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['organization']);
    }
  }
);


const useDeleteOrganizationUnit = (queryClient: QueryClient) => useMutation(
  async (data: IdTemplate) => organizationsRequests.deleteUnit(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['organization']);
    }
  }
);

const useCreateOrganizationMember = (queryClient: QueryClient) => useMutation(
  async (data: UpdateTemplate) => organizationsRequests.createMember(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['organization']);
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
      await queryClient.invalidateQueries(['organization']);
    },
    onError: (err: AxiosError<{description: string}>) => {
      if (err.response?.status === 400) {
        const message = `${err?.response?.status} - ${err?.response?.data.description}`;
        toast.error(message);
      }
    }
  }
);

const useOrganizationsDeviceQuery = ({orgId}: {orgId: string}) => useQuery(
  ['organizations', 'devices'],
  async () => organizationsRequests.fetchDeviceDetails({orgId}),
);

interface AccessTypeTemplate extends IdTemplate {
  accessType: string;
  memberId: string;
}

const useAssignDeviceAccess = (queryClient: QueryClient) => useMutation(
  async (data: AccessTypeTemplate) => organizationsRequests.assignDeviceAccess(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['organization']);
    },
    onError: (err: AxiosError<{description: string}>) => {
      if (err.response?.status === 400) {
        const message = `${err?.response?.status} - ${err?.response?.data.description}`;
        toast.error(message);
      }
    }
  }
);

const useRevokeDeviceAccess = (queryClient: QueryClient) => useMutation(
  async (data: AccessTypeTemplate) => organizationsRequests.revokeDeviceAccess(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['organization']);
    },
    onError: (err: AxiosError<{description: string}>) => {
      if (err.response?.status === 400) {
        const message = `${err?.response?.status} - ${err?.response?.data.description}`;
        toast.error(message);
      }
    }
  }
);

const useAssignManagerAccess = (queryClient: QueryClient) => useMutation(
  async (data: MemberIdTemplate) => organizationsRequests.assignManagerAccess(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['organization']);
    },
    onError: (err: AxiosError<{description: string}>) => {
      if (err.response?.status === 400) {
        const message = `${err?.response?.status} - ${err?.response?.data.description}`;
        toast.error(message);
      }
    }
  }
);

const useRevokeManagerAccess = (queryClient: QueryClient) => useMutation(
  async (data: MemberIdTemplate) => organizationsRequests.revokeManagerAccess(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['organization']);
    },
    onError: (err: AxiosError<{description: string}>) => {
      if (err.response?.status === 400) {
        const message = `${err?.response?.status} - ${err?.response?.data.description}`;
        toast.error(message);
      }
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
  useUpdateOrganizationUnit,
  useDeleteOrganizationUnit,
  useCreateOrganizationMember,
  useOrganizationsMembersQuery,
  useMoveOrganizationMember,
  useOrganizationsDeviceQuery,
  useAssignDeviceAccess,
  useRevokeDeviceAccess,
  useAssignManagerAccess,
  useRevokeManagerAccess,
};
