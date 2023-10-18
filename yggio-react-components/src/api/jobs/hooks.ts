/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {useQuery} from '@tanstack/react-query';
import {jobRequests} from '.';

const useJob = (jobId?: string) => useQuery(
  ['job', jobId],
  async () => jobRequests.get(jobId!),
  {
    enabled: !!jobId,
    refetchInterval: 2000,
  }
);

export {
  useJob,
};
