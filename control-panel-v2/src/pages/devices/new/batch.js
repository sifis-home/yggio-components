import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicBatchInstallation = dynamic(
  () => import('yggio-react-components').then(mod => mod.BatchModeRoute),
  {ssr: false}
);

const BatchInstallation = () => {
  const router = useRouter();
  return (
    <DynamicBatchInstallation router={router} />
  );
};

export default BatchInstallation;
