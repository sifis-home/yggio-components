/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
