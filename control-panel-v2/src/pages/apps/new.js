import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicAppCreator = dynamic(
  () => import('yggio-react-components').then(mod => mod.AppCreator),
  {ssr: false}
);

const AppCreator = () => {
  const router = useRouter();
  return (
    <DynamicAppCreator router={router} />
  );
};

export default AppCreator;
