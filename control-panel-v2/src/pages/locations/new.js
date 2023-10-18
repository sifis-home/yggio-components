import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicLocationCreator = dynamic(
  () => import('yggio-react-components').then(mod => mod.LocationCreator),
  {ssr: false}
);

const NewLocations = () => {
  const router = useRouter();
  return (
    <DynamicLocationCreator
      router={router}
    />
  );
};

export default NewLocations;
