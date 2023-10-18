import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicCreateOrganization = dynamic(
  () => import('yggio-react-components').then(mod => mod.CreateOrganizationPane),
  {ssr: false}
);

const CreateOrganization = () => {
  const router = useRouter();
  return (
    <DynamicCreateOrganization router={router} />
  );
};

export default CreateOrganization;
