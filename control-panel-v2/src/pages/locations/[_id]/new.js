import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicLocationLayerCreator = dynamic(
  () => import('yggio-react-components').then(mod => mod.LayerCreator),
  {ssr: false}
);

const LocationLayerCreator = () => {
  const router = useRouter();
  return (
    <DynamicLocationLayerCreator
      router={router}
      locationId={router.query._id}
    />
  );
};

export default LocationLayerCreator;
