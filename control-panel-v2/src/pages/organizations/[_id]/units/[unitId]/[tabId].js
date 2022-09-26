/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicUnitView = dynamic(
  () => import('yggio-react-components').then(mod => mod.OrganizationUnit),
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
