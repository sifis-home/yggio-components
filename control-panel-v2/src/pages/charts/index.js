import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicCharts = dynamic(
  () => import('yggio-react-components').then(mod => mod.ChartsPane),
  {ssr: false}
);

const Charts = () => {
  const router = useRouter();
  return (
    <DynamicCharts router={router} />
  );
};

export default Charts;
