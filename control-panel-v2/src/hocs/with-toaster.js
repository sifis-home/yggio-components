import React from 'react';
import dynamic from 'next/dynamic';

const DynamicToaster = dynamic(
  () => import('yggio-react-components').then(mod => mod.Toaster),
  {ssr: false}
);

const withToaster = Component => {
  const Toaster = props => (
    <>
      <DynamicToaster position='bottom-left' />
      <Component {...props} />
    </>
  );
  return Toaster;
};

export default withToaster;
