/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicDashboard = dynamic(
  () => import('yggio-react-components').then(mod => {
    return mod.Dashboard;
  }),
  {ssr: false}
);

const Page = props => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <meta name="description" content="Yggio Portal" />
        <link rel="icon" href="/control-panel-v2/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/control-panel-v2/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/control-panel-v2/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/control-panel-v2/favicon-16x16.png" />
        <link rel="manifest" href="/control-panel-v2/site.webmanifest" />
        <link rel="mask-icon" href="/control-panel-v2/safari-pinned-tab.svg" color="#3c7d44" />
        <meta name="msapplication-TileColor" content="#00a300" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <main>
        <DynamicDashboard router={router} />
      </main>
    </div>
  );
};

export default Page;
