import {useQuery} from '@tanstack/react-query';
import {basicCredentialsSetsRequests} from '.';

const useBasicCredentialsSets = () => useQuery(
  ['basicCredentialsSets'],
  async () => await basicCredentialsSetsRequests.fetch(),
);

export {
  useBasicCredentialsSets,
};
