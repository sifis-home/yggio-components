import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicApps = dynamic(
  () => import('yggio-react-components').then(mod => mod.AppsPane),
  {ssr: false}
);

const Apps = () => {
  const router = useRouter();
  return (
    <DynamicApps router={router} />
  );
};

export default Apps;
