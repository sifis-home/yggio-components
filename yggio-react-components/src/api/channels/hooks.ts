/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {useQuery, useMutation, QueryClient} from '@tanstack/react-query';
import {toast} from 'react-hot-toast';
import {Channel} from '../../types';
import {getRequestErrorMessage} from '../../utils';
import {channelsRequests} from '.';

const useChannelsQuery = (deviceId: string) => useQuery(
  ['channels'],
  async () => channelsRequests.get(deviceId),
);

const useCreateChannel = (queryClient: QueryClient) => useMutation(
  async (data: Omit<Channel, '_id'>) => channelsRequests.create(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['channels']);
    },
  },
);

const useCreateChannels = (queryClient: QueryClient) => useMutation(
  async (data: Omit<Channel, '_id'>[]) => channelsRequests.createMany(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['channels']);
      toast.success('Channels successfully created');
    },
    onError: (err: Error) => {
      toast.error(getRequestErrorMessage(err));
    },
  },
);

const useRemoveChannel = (queryClient: QueryClient) => useMutation(
  async (channelId: string) => channelsRequests.remove(channelId),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['channels']);
    },
  },
);

export {
  useChannelsQuery,
  useCreateChannel,
  useCreateChannels,
  useRemoveChannel,
};
