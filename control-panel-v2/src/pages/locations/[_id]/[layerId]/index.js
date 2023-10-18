import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicLocationView = dynamic(
  () => import('yggio-react-components').then(mod => mod.LocationView),
  {ssr: false}
);

const LocationView = () => {
  const router = useRouter();
  return (
    <DynamicLocationView
      router={router}
      locationId={router.query._id}
      layerId={router.query.layerId}
    />
  );
};

export default LocationView;
