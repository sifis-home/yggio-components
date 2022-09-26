/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {useQuery, useMutation, QueryClient} from '@tanstack/react-query';
import {accessRightsRequests} from '.';
import {AccessRightCreationTemplate, AccessRightDeletionTemplate} from './types';

interface AccessRightsQuery {
  subjectId: string;
  select: (data: unknown) => unknown;
}

const useAccessRightsSubjectQuery = ({
  subjectId,
  select,
}: AccessRightsQuery) => (
  useQuery(
    ['subjectAccessRights'],
    async () => accessRightsRequests.fetchSubject({subjectId}),
    {select, enabled: !!subjectId},
  )
);

const useAccessRightsResourceQuery = ({
  deviceId,
}: {deviceId: string}) => (
  useQuery(
    ['resourceAccessRights'],
    async () => accessRightsRequests.fetchResource({deviceId}),
    {
      enabled: !!deviceId,
    },
  )
);

const useCreateAccessRight = (queryClient: QueryClient) => useMutation(
  async (props: AccessRightCreationTemplate) => accessRightsRequests.create(props),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['resourceAccessRights']);
      await queryClient.invalidateQueries(['subjectAccessRights']);
    },
  },
);

const useRemoveAccessRight = (queryClient: QueryClient) => useMutation(
  async (props: AccessRightDeletionTemplate) => accessRightsRequests.remove(props),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['resourceAccessRights']);
      await queryClient.invalidateQueries(['subjectAccessRights']);
    },
  },
);

export {
  useAccessRightsSubjectQuery,
  useAccessRightsResourceQuery,
  useCreateAccessRight,
  useRemoveAccessRight,
};
