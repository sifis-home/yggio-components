/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {toast} from 'react-hot-toast';
import {compose} from 'lodash/fp';
import React from 'react';
import cookie from 'js-cookie';
import {NextRouter} from 'next/router';

import {
  withLanguage,
} from '../../hocs';
import LogoSpinner from '../../components/logo-spinner';
import {
  Box,
  LoginContent,
} from './styled';
import {authApi, getYggioToken, setYggioToken} from '../../api';
import {objectToQueryString} from '../../utils';
import {COOKIE_OAUTH_STATE_KEY} from '../../constants';

const OAuthStateCookie = cookie.get(COOKIE_OAUTH_STATE_KEY);

interface UnauthenticatedUserPaneProps {
  children: React.FC;
  router: NextRouter;
  t(key: string): string;
}

interface OAuthStateProps {
  clientId: string;
  redirectionEndpoint: string;
}

const RawUnauthenticatedUserPane = (props: UnauthenticatedUserPaneProps) => {
  let yggioToken = getYggioToken();
  const queryParams = props.router.query;
  const oAuthState = JSON.parse(OAuthStateCookie || '{}') as OAuthStateProps;

  const authCode = authApi.useGetAuthCode({
    redirectionEndpoint: oAuthState?.redirectionEndpoint,
    clientId: oAuthState?.clientId,
    code: queryParams.code,
    yggioToken,
  });

  const authInfo = authApi.useGetAuthInfo();

  const fetchedToken = authCode.data?.token;

  if (fetchedToken) {
    yggioToken = fetchedToken;
  }

  React.useEffect(() => {
    if (fetchedToken) {
      setYggioToken(fetchedToken);
    }
  }, [fetchedToken]);

  const redirectUser = () => {
    if (authInfo.data) {

      const {
        authorizationEndpoint,
        clientId,
        redirectURIs,
        scope
      } = authInfo.data;

      const redirectionEndpoint = _.find(redirectURIs, _.method('includes', 'control-panel-v2'));
      const state = _(24).times(() => _.sample('abcdefghijklmnoprstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ1234567890½!"#¤%&/()=?¶¡@£$€¥{[]}-.,_:;¨^*~<>|')).join('');
      const stateData = {
        authorizationEndpoint,
        clientId,
        failUrl: `${window.location.origin}${window.location.pathname}`,
        redirectionEndpoint,
        scope,
        state,
        successUrl: `${window.location.origin}${window.location.pathname}`,
      };
      cookie.set(COOKIE_OAUTH_STATE_KEY, stateData);

      const queryParams = {
        // eslint-disable-next-line camelcase
        client_id: clientId,
        // eslint-disable-next-line camelcase
        redirect_uri: redirectionEndpoint,
        scope,
        state,
        // eslint-disable-next-line camelcase
        response_type: 'code'
      };

      const queryParamsString = objectToQueryString(queryParams);

      // Clear persistent states
      localStorage.removeItem('yggio-devices-list-filter');
      localStorage.removeItem('yggio-devices-list-ui');

      window.location.replace(`${authorizationEndpoint}${queryParamsString}`);
    } else {
      toast.error('Error attempting authentication');
    }
  };

  if (yggioToken) {
    return props.children;
  }

  if (!authInfo.isLoading) {
    redirectUser();
  }

  return (
    <Box>
      <LoginContent>
        {(authCode.isLoading || authInfo.isLoading) &&
          <>
            <LogoSpinner />
            {!authCode.isSuccess &&
              <p>{props.t('phrases.connectingToYggio')}</p>}
            {authCode.isSuccess &&
              <p>{props.t('phrases.checkingCredentials')}</p>}
          </>}
      </LoginContent>
    </Box>
  );
};

export default compose(
  withLanguage(),
)(RawUnauthenticatedUserPane);
