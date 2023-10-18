import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicLocationEditor = dynamic(
  () => import('yggio-react-components').then(mod => mod.LocationEditor),
  {ssr: false}
);

const LocationEditor = () => {
  const router = useRouter();
  return (
    <DynamicLocationEditor
      router={router}
      locationId={router.query._id}
    />
  );
};

export default LocationEditor;
