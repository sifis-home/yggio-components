'use client';

import App from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import getConfig from 'next/config';
import {useRouter} from 'next/router';

import '../../styles/global.css';
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

  const router = useRouter();

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
    );
  }

  if (router.pathname === '/swagger') {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <Head>
        <title>Yggio Control Panel</title>
      </Head>
      <DynamicLayout dehydratedState={pageProps.dehydratedState}>
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
