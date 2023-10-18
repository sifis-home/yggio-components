import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicLayerEditor = dynamic(
  () => import('yggio-react-components').then(mod => mod.LayerEditor),
  {ssr: false}
);

const LayerEditor = () => {
  const router = useRouter();
  return (
    <DynamicLayerEditor
      router={router}
      locationId={router.query._id}
      layerId={router.query.layerId}
    />
  );
};

export default LayerEditor;
