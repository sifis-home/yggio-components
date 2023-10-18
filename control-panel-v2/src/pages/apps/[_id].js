import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicApp = dynamic(
  () => import('yggio-react-components').then(mod => mod.AppPane),
  {ssr: false}
);

const App = () => {
  const router = useRouter();
  return (
    <DynamicApp router={router} appId={router.query._id} />
  );
};

export default App;
