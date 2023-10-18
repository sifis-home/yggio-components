import {useQuery} from '@tanstack/react-query';
import {authRequests} from '.';
import {AuthCodeProps} from './types';

const useGetAuthInfo = () => useQuery(
  ['auth', 'info'],
  async () => authRequests.getAuthInfo(),
);

interface AuthCodeTemplate extends AuthCodeProps {
  yggioToken?: string;
}

const useGetAuthCode = ({
  code,
  clientId,
  redirectionEndpoint,
  yggioToken,
}: AuthCodeTemplate) => useQuery(
  ['auth', 'code'],
  async () => authRequests.getAuthCode({code, clientId, redirectionEndpoint}),
  {
    enabled: !!code && !!clientId && !!redirectionEndpoint && !yggioToken,
  }
);

export {
  useGetAuthInfo,
  useGetAuthCode,
};
