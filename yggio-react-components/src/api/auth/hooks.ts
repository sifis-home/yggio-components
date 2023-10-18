/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
