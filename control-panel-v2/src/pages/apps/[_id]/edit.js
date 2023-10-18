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

const DynamicAppEditor = dynamic(
  () => import('yggio-react-components').then(mod => mod.AppEditor),
  {ssr: false}
);

const AppEditor = () => {
  const router = useRouter();
  return (
    <DynamicAppEditor router={router} appId={router.query._id} />
  );
};

export default AppEditor;
