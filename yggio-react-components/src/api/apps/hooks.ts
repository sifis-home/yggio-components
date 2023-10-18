import {useQuery, useMutation, QueryClient} from '@tanstack/react-query';

import type {AppTypes} from 'yggio-models';

import {appRequests} from '.';

import type {FetchProps} from './types';

const useAppsQuery = (params: FetchProps) => useQuery(
  ['apps', params],
  async () => appRequests.fetch(params),
  {
    select: data => ({
      items: data.body,
      totalCount: data.headers['total-count'],
    }),
  }
);

const useAppQuery = (id: string) => useQuery(
  ['apps', id],
  async () => appRequests.fetchOne(id),
  {
    meta: {
      suppressErrorToaster: true,
    }
  }
);

const useCreateApp = (queryClient: QueryClient) => useMutation(
  async (data: Partial<AppTypes.AppInput>) => appRequests.create(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['apps']);
    },
    onError (error) {
      return error;
    },
    meta: {
      suppressErrorToaster: true,
    }
  },
);

const useUpdateApp = (queryClient: QueryClient) => useMutation(
  async ({appId, updates}: {appId: string, updates: Partial<AppTypes.AppUpdate>}) => appRequests.update({appId, updates}),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['apps']);
    },
  },
);

const useRemoveApp = (queryClient: QueryClient) => useMutation(
  async (appId: string) => appRequests.remove(appId),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['apps']);
    },
  },
);

const useCreateAppAccess = (queryClient: QueryClient) => useMutation(
  async ({appId, updates}: {appId: string, updates: object}) => appRequests.createAccess({appId, updates}),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['apps', 'access']);
    },
  },
);


const useRemoveAppAccess = (queryClient: QueryClient) => useMutation(
  async ({appId, updates}: {appId: string, updates: object}) => appRequests.removeAccess({appId, updates}),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['apps', 'access']);
    },
  },
);

const useAppResourceAccessQuery = ({resourceId}: {resourceId: string}) => useQuery(
  ['apps', 'access', resourceId],
  async () => appRequests.fetchResourceAccess({resourceId}),
);

const useAppSubjectAccessQuery = ({subjectId}: {subjectId: string}) => useQuery(
  ['apps', 'access', subjectId],
  async () => appRequests.fetchSubjectAccess({subjectId}),
);

export {
  useAppsQuery,
  useAppQuery,
  useCreateApp,
  useUpdateApp,
  useRemoveApp,

  useCreateAppAccess,
  useRemoveAppAccess,
  useAppResourceAccessQuery,
  useAppSubjectAccessQuery,
};
