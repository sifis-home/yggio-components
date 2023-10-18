import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicAppStore = dynamic(
  () => import('yggio-react-components').then(mod => mod.AppStorePane),
  {ssr: false}
);

const AppStore = () => {
  const router = useRouter();
  return (
    <DynamicAppStore router={router} />
  );
};

export default AppStore;
