/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import App from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import getConfig from 'next/config';

import '../../styles/globals.css';
import '../../styles/leaflet.css';
import '../../styles/react-confirm-alert.css';

const {publicRuntimeConfig} = getConfig();

const DynamicLayout = dynamic(
  () => import('../components/layout'),
  {ssr: false},
);

const DynamicLogoSpinner = dynamic(
  () => import('yggio-react-components').then(mod => mod.LogoSpinner),
  {ssr: false},
);

const DynamicConfigurator = dynamic(
  () => import('yggio-react-components').then(mod => {
    mod.setConfig(publicRuntimeConfig);
    return '';
  }),
  {ssr: false}
);

const YggioApp = ({Component, pageProps}) => {
  const [appReady, setAppReady] = React.useState(false);
  import('yggio-react-components')
    .then(mod => mod.setConfig({config: publicRuntimeConfig, setAppReady}));

  if (!appReady) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '70vh',
      }}>
        <DynamicLogoSpinner />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Yggio Control Panel</title>
      </Head>
      <DynamicLayout>
        <Component appReady={appReady} {...pageProps} />
      </DynamicLayout>
      <DynamicConfigurator />
    </>
  );
};

YggioApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);

  return {...appProps};
};

export default YggioApp;
