import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import {dehydrate, QueryClient} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import {REQUEST_METHODS, COLLECTION_NAMES} from '../../../constants';
import handler from '../../../commands';

const DynamicOrganizationView = dynamic(
  () => import('yggio-react-components').then(mod => mod.OrganizationView),
  {ssr: false}
);

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

const OrganizationView = () => {
  const router = useRouter();
  return (
    <DynamicOrganizationView
      router={router}
      orgId={router.query._id}
      tabId={router.query.tabId}
    />
  );
};

export default OrganizationView;
