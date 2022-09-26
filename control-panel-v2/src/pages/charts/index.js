/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicCharts = dynamic(
  () => import('yggio-react-components').then(mod => mod.ChartsPane),
  {ssr: false}
);

const Charts = () => {
  const router = useRouter();
  return (
    <DynamicCharts router={router} />
  );
};

export default Charts;
