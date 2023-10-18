import React from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicUnitView = dynamic(
  () => import('yggio-react-components').then(mod => mod.OrganizationUnitPane),
  {ssr: false}
);

const UnitView = () => {
  const router = useRouter();
  return (
    <DynamicUnitView
      router={router}
      orgId={router.query._id}
      tabId={router.query.tabId}
      unitId={router.query.unitId}
    />
  );
};

export default UnitView;
