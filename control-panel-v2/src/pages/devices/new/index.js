import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicModeSelection = dynamic(
  () => import('yggio-react-components').then(mod => mod.ModeSelectionPane),
  {ssr: false}
);

const ModeSelection = () => {
  const router = useRouter();
  return (
    <DynamicModeSelection router={router} />
  );
};

export default ModeSelection;
