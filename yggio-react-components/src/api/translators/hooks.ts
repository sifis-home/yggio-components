import {useQuery} from '@tanstack/react-query';
import {translatorsRequests} from '.';

const useTranslatorsQuery = (deviceModelName?: string) => useQuery(
  ['translators', deviceModelName],
  async () => translatorsRequests.fetch(deviceModelName),
);

export {
  useTranslatorsQuery,
};
