import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicDeviceView = dynamic(
  () => import('yggio-react-components').then(mod => mod.DeviceViewPane),
  {ssr: false}
);

const DeviceView = () => {
  const router = useRouter();
  return (
    <DynamicDeviceView
      router={router}
      deviceId={router.query._id}
      tabId={router.query.tab}
    />
  );
};

export default DeviceView;
