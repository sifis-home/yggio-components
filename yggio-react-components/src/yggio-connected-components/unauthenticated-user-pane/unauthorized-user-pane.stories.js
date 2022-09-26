/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {storiesOf} from '@storybook/react';

import RawUnauthenticatedUserPane from '.';
import t from '../../utils/translation-prop';

const getAuthInfo = () => console.info('getAuthCode');
const getAuthCode = () => console.info('getAuthCode');
const redirectUser = () => console.info('redirectUser');

storiesOf('Yggio/Unauthenticated User Pane/Raw', module)

  .add('raw default', () => {
    const props = {
      token: null,
      connectivityState: 'connected',
      getAuthInfoRequest: {
        isLoading: false
      },
      getAuthCodeRequest: {
        isLoading: false
      },
      appName: 'test-app',
      t,
      getAuthInfo,
      getAuthCode,
      redirectUser,
    };
    return <RawUnauthenticatedUserPane {...props} />;
  })

  .add('raw waiting for auth info or Yggio connection', () => {
    const props = {
      token: null,
      connectivityState: 'offline',
      getAuthCodeRequest: {
        isLoading: false
      },
      getAuthInfoRequest: {
        isLoading: true
      },
      appName: 'test-app',
      getAuthInfo,
      getAuthCode,
      redirectUser,
      t,
    };
    return <RawUnauthenticatedUserPane {...props} />;
  })

  .add('raw waiting for auth code', () => {
    const props = {
      token: null,
      connectivityState: 'connected',
      getAuthInfoRequest: {
        isLoading: false
      },
      getAuthCodeRequest: {
        isLoading: true
      },
      appName: 'test-app',
      getAuthInfo,
      getAuthCode,
      redirectUser,
      t,
    };
    return <RawUnauthenticatedUserPane {...props} />;
  });
