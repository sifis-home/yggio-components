import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicLocations = dynamic(
  () => import('yggio-react-components').then(mod => mod.Locations),
  {ssr: false}
);

const Locations = () => {
  const router = useRouter();
  return (
    <DynamicLocations router={router} />
  );
};

export default Locations;
