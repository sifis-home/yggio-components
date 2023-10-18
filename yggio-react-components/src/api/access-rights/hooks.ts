import {useQuery, useMutation, QueryClient} from '@tanstack/react-query';
import {accessRightsRequests} from '.';
import {AccessRightCreationTemplate, AccessRightDeletionParams} from './types';
import {ResourceType} from '../../types';

interface AccessRightsQuery {
  subjectId?: string;
  subjectType: 'user' | 'group';
  resourceType: ResourceType;
}

const useAccessRightsSubjectQuery = ({
  subjectId,
  subjectType,
  resourceType,
}: AccessRightsQuery) => (
  useQuery(
    ['subjectAccessRights'],
    async () => accessRightsRequests.fetchSubjectAccessRights({subjectId: subjectId!, subjectType, resourceType}),
    {
      enabled: !!subjectId
    },
  )
);

const useAccessRightsResourceQuery = ({
  resourceId,
  resourceType
}: {resourceId: string, resourceType: ResourceType}) => (
  useQuery(
    ['resourceAccessRights'],
    async () => accessRightsRequests.fetchResourceAccessRights({resourceId, resourceType}),
    {
      enabled: !!resourceId,
    },
  )
);

const useCreateAccessRight = (queryClient: QueryClient) => useMutation(
  async (template: AccessRightCreationTemplate) => accessRightsRequests.createAccessRight(template),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['resourceAccessRights']);
      await queryClient.invalidateQueries(['subjectAccessRights']);
    },
  },
);

const useRemoveAccessRight = (queryClient: QueryClient) => useMutation(
  async (props: AccessRightDeletionParams) => accessRightsRequests.removeAccessRight(props),
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
