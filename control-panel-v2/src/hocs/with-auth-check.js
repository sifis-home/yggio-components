/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const UnauthorizedUserPane = dynamic(
  () => import('yggio-react-components').then(mod => mod.UnauthorizedUserPane),
  {ssr: false}
);

const withAuthCheck = Component => (props) => {
  const router = useRouter();
  return (
    <UnauthorizedUserPane router={router} >
     <Component {...props} />
    </UnauthorizedUserPane>
  );
}

export default withAuthCheck;
