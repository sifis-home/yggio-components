/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicLocationLayerCreator = dynamic(
  () => import('yggio-react-components').then(mod => mod.LayerCreator),
  {ssr: false}
);

const LocationLayerCreator = () => {
  const router = useRouter();
  return (
    <DynamicLocationLayerCreator
      router={router}
      locationId={router.query._id}
    />
  );
};

export default LocationLayerCreator;
