import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicAppEditor = dynamic(
  () => import('yggio-react-components').then(mod => mod.AppEditor),
  {ssr: false}
);

const AppEditor = () => {
  const router = useRouter();
  return (
    <DynamicAppEditor router={router} appId={router.query._id} />
  );
};

export default AppEditor;
