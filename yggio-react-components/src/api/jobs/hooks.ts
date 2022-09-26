/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {useQuery, useMutation, QueryClient} from '@tanstack/react-query';
import {toast} from 'react-hot-toast';

import {getRequestErrorMessage} from '../../utils';
import {DeviceCommands, Job} from '../../types';
import {jobRequests} from '.';
import {selectJob} from './selectors';

const useJob = (jobId?: string) => useQuery(
  ['job', jobId],
  async () => jobRequests.get(jobId!),
  {
    enabled: !!jobId,
    select: selectJob,
    refetchInterval: 2000,
  }
);

const useDeviceCommandsJob = (queryClient: QueryClient) => useMutation(
  async (template: DeviceCommands) => jobRequests.createDeviceCommandsJob(template),
  {
    onSuccess: async (result: Job) => {
      await queryClient.invalidateQueries(['job']);
      return result;
    },
    onError: (err: Error) => {
      toast.error(getRequestErrorMessage(err));
    },
  }
);

const useRemoveDevicesJob = (queryClient: QueryClient) => useMutation(
  async (deviceIds: string[]) => jobRequests.removeDevicesJob(deviceIds),
  {
    onSuccess: async (result: Job) => {
      await queryClient.invalidateQueries(['job']);
      return result;
    },
    onError: (err: Error) => {
      toast.error(getRequestErrorMessage(err));
    },
  }
);

export {
  useJob,
  useDeviceCommandsJob,
  useRemoveDevicesJob,
};
