/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
