/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
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
