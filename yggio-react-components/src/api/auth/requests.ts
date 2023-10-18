import {request} from '../request';

import {
  HTTP_METHODS,
  RESOURCE_TYPES,
} from '../../constants';
import {AuthCodeProps} from './types';

interface AuthInfo {
  authorizationEndpoint: string;
  clientId: string;
  signoutEndpoint: string;
  redirectURIs: string[];
  scope: string;
}

const getAuthInfo = async () => request<AuthInfo>({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.auth}/info`,
});

interface AuthCode {
  token: string;
}

const getAuthCode = async ({
  code,
  clientId,
  redirectionEndpoint,
}: AuthCodeProps) => request<AuthCode>({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.auth}/code`,
  params: {
    code,
    /* eslint-disable camelcase */
    client_id: clientId,
    redirect_uri: redirectionEndpoint,
    /* eslint-enable camelcase */
  },
});

const getTokenUser = async () => request({
  method: HTTP_METHODS.get,
  URI: `${RESOURCE_TYPES.users}/me`,
});

export {
  getAuthInfo,
  getAuthCode,
  getTokenUser,
};
