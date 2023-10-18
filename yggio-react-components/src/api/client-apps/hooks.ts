import {useQuery} from '@tanstack/react-query';

import {clientAppsRequests} from '.';

const useClientAppsQuery = () => useQuery(
  ['clientApps'],
  async () => clientAppsRequests.fetch(),
  {
    refetchOnWindowFocus: false,
  },
);

export {
  useClientAppsQuery,
};
