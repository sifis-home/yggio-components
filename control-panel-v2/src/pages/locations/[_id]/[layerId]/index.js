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

const DynamicLocationView = dynamic(
  () => import('yggio-react-components').then(mod => mod.LocationView),
  {ssr: false}
);

const LocationView = () => {
  const router = useRouter();
  return (
    <DynamicLocationView
      router={router}
      locationId={router.query._id}
      layerId={router.query.layerId}
    />
  );
};

export default LocationView;
