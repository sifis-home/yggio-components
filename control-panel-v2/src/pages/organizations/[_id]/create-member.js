import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicCreateOrganizationMember = dynamic(
  () => import('yggio-react-components').then(mod => mod.CreateMemberPane),
  {ssr: false}
);

const CreateOrganizationMember = () => {
  const router = useRouter();
  return (
    <DynamicCreateOrganizationMember router={router} />
  );
};

export default CreateOrganizationMember;
