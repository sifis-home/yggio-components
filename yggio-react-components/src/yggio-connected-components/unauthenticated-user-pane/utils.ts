import _ from 'lodash';
import cookie from 'js-cookie';

import {objectToQueryString} from '../../utils';
import {COOKIE_OAUTH_STATE_KEY} from '../../constants';

interface RedirectUserProps {
  authInfoData?: {
    authorizationEndpoint: string;
    clientId: string;
    redirectURIs: string[];
    scope: string;
  };

}

const redirectUser = ({
  authInfoData,
}: RedirectUserProps) => {
  if (authInfoData) {
    const {
      authorizationEndpoint,
      clientId,
      redirectURIs,
      scope
    } = authInfoData;

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
    cookie.set(COOKIE_OAUTH_STATE_KEY, JSON.stringify(stateData));

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
  }
};

export {
  redirectUser,
};
