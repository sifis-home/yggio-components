import {useQuery, useMutation, QueryClient} from '@tanstack/react-query';
import {User} from '../../types';
import {userRequests} from '.';

const useTokenUser = () => (
  useQuery(
    ['user'],
    async () => userRequests.fetchTokenUser(),
  )
);

const useUpdateUser = (queryClient: QueryClient) => useMutation(
  async ({updates}: {updates: Partial<User>}) => userRequests.update({updates}),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['user']);
    }
  }
);

export {
  useTokenUser,
  useUpdateUser,
};
