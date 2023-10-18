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
