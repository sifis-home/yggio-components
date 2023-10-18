/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import {dehydrate, QueryClient} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import handler from '../../commands';
import {REQUEST_METHODS, COLLECTION_NAMES} from '../../constants';

const DynamicOrganizationsList = dynamic(
  () => import('yggio-react-components').then(mod => mod.OrganizationsListPane),
  {ssr: false}
);

const OrganizationsList = () => {
  const router = useRouter();

  return (
    <DynamicOrganizationsList router={router} />
  );
};

export const getServerSideProps = async ctx => {
  const queryClient = new QueryClient();

  const authToken = getCookie('token', ctx);

  const themeHandler = await handler({
    authToken,
    queryCommand: COLLECTION_NAMES.themes,
    config: ctx.req.config,
  });

  const themes = await themeHandler({method: REQUEST_METHODS.get});

  await queryClient.prefetchQuery({
    queryKey: ['ui', COLLECTION_NAMES.themes],
    queryFn: async () => themes,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default OrganizationsList;
