import React from 'react';
import dynamic from 'next/dynamic';

const DynamicLogsPane = dynamic(
  () => import('yggio-react-components').then(mod => mod.LogsPane),
  {ssr: false}
);

const LogsPane = () => {
  return (
    <DynamicLogsPane />
  );
};

export default LogsPane;
