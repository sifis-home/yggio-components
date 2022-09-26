/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const DynamicModeSelection = dynamic(
  () => import('yggio-react-components').then(mod => mod.ModeSelection),
  {ssr: false}
);

const ModeSelection = () => {
  const router = useRouter();
  return (
    <DynamicModeSelection router={router} />
  );
};

export default ModeSelection;
