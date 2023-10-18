import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicSingleInstallation = dynamic(
  () => import('yggio-react-components').then(mod => mod.SingleModeRoute),
  {ssr: false}
);

const SingleInstallation = () => {
  const router = useRouter();
  return (
    <DynamicSingleInstallation router={router} />
  );
};

export default SingleInstallation;
