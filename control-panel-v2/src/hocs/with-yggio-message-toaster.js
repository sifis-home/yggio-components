/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import dynamic from 'next/dynamic';

const DynamicYggioMessageToaster = dynamic(
  () => import('yggio-react-components').then(mod => mod.YggioMessageToaster),
  {ssr: false}
);

const withYggioMessageToaster = Component => (props) => (
  <>
    <DynamicYggioMessageToaster />
    <Component {...props} />
  </>
);

export default withYggioMessageToaster;
