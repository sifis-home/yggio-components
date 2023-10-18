/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {compose} from 'lodash/fp';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import {withChakraProvider, withQueryClientProvider} from 'yggio-react-components';

import withAuthCheck from '../hocs/with-auth-check';
import withToaster from '../hocs/with-toaster';

const DynamicNavbarPane = dynamic(
  () => import('yggio-react-components').then(mod => mod.NavbarPane),
  {ssr: false}
);

const DynamicWebSocket = dynamic(
  () => import('yggio-react-components').then(mod => mod.WebSocket),
  {ssr: false}
);

const Layout = props => {
  React.useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line global-require
      const axe = require('@axe-core/react');
      axe(React, ReactDOM, 500);
    }
  }, []);
  const router = useRouter();

  return (
      <DynamicNavbarPane
        appName={'portal'}
        title={'Yggio'}
        router={router}
      >
        <DynamicWebSocket>
          <div style={{fontFamily: 'Lato'}}>
            {props.children}
          </div>
        </DynamicWebSocket>
      </DynamicNavbarPane>
  );
};

export default compose(
  withQueryClientProvider,
  withChakraProvider,
  withToaster,
  withAuthCheck,
)(Layout);
