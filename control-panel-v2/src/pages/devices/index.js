import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicDeviceList = dynamic(
  () => import('yggio-react-components').then(mod => mod.DeviceListPane),
  {ssr: false}
);

const DeviceList = () => {
  const router = useRouter();

  return (
    <DynamicDeviceList router={router} />
  );
};

export default DeviceList;
