import _ from 'lodash';
import {useQuery} from '@tanstack/react-query';
import {usersRequests} from '.';

const useUsersQuery = () => (
  useQuery(
    ['users'],
    async () => usersRequests.fetch(),
  )
);

const useSeekUsersQuery = (userIds?: string[]) => (
  useQuery(
    ['users', 'seek', userIds],
    async () => usersRequests.seek(userIds),
    {enabled: userIds && !_.isEmpty(userIds)},
  )
);

const useGetUser = (params: Partial<{id: string, username: string}>) => useQuery(
  ['user', params],
  async () => usersRequests.get(params),
  {
    enabled: !!params.id || !!params.username,
    retry: 1,
    refetchOnWindowFocus: false,
    meta: {
      suppressErrorToaster: true,
    }
  },
);

export {
  useUsersQuery,
  useSeekUsersQuery,
  useGetUser,
};
