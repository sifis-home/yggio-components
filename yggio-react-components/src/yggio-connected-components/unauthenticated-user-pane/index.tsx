import _ from 'lodash';
import React from 'react';
import cookie from 'js-cookie';
import {NextRouter} from 'next/router';
import {useTranslation} from 'react-i18next';
import {Flex, Text} from '@chakra-ui/react';

import LogoIcon from '../../components/logo';
import YGGIO_LOGO from '../../assets/images/yggio-icon-animated.svg';
import Button from '../../components/button';
import LogoSpinner from '../../components/logo-spinner';
import {
  Box,
  LoginContent,
} from './styled';
import {authApi, getYggioToken, setYggioToken} from '../../api';
import {COOKIE_OAUTH_STATE_KEY} from '../../constants';
import {redirectUser} from './utils';

const OAuthStateCookie = cookie.get(COOKIE_OAUTH_STATE_KEY);

interface UnauthenticatedUserPaneProps {
  children: React.FC;
  router: NextRouter;
}

interface OAuthStateProps {
  clientId: string;
  redirectionEndpoint: string;
}

const RawUnauthenticatedUserPane = (props: UnauthenticatedUserPaneProps) => {
  const yggioToken = getYggioToken();

  const {t} = useTranslation();

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

  React.useEffect(() => {
    if (fetchedToken) {
      setYggioToken(fetchedToken);
    }
  }, [fetchedToken]);


  if (yggioToken || fetchedToken) {
    return props.children;
  }

  if (!authInfo.isLoading && !queryParams.code) {
    redirectUser({authInfoData: authInfo.data});
  }

  if (_.every([
    (!yggioToken || !fetchedToken),
    (authCode.isLoading || authInfo.isLoading),
    (!authInfo.isError && !authCode.isError),
  ])) {
    return (
      <Box>
        <LoginContent>
          <>
            <LogoSpinner />
            {!authCode.isSuccess && (
              <p>{t<string>('phrases.connectingToYggio')}</p>
            )}
            {authCode.isSuccess && (
              <p>{t('phrases.checkingCredentials')}</p>
            )}
          </>
        </LoginContent>
      </Box>
    );
  }


  return (
    <Flex
      h='60vh'
      justify='center'
      align='center'
      flexDir='column'
    >
      <LogoIcon
        src={YGGIO_LOGO}
        alt={'Yggio'}
        height={'200px'}
        width={'200px'}
        margin={'0 9px 0 0'}
      />
      <Text m='10px'>Something went wrong, please try again.</Text>
      <Button
        width='180px'
        color='green'
        onClick={() => {
          void authInfo.refetch();
          void authCode.refetch();
        }}
        content='Login'
      />
    </Flex>
  );
};

export default RawUnauthenticatedUserPane;
