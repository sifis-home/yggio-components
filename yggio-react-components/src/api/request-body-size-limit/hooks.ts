import {useQuery} from '@tanstack/react-query';
import {requestBodySizeLimitRequests} from '.';

const useRequestBodySizeLimitQuery = () => (
  useQuery(
    ['request-body-size-limit'],
    async () => requestBodySizeLimitRequests.get(),
  )
);

export {
  useRequestBodySizeLimitQuery,
};
