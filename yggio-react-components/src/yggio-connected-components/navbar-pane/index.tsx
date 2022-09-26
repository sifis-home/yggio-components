/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {useQueryClient} from '@tanstack/react-query';

import {NextRouter} from 'next/router';
import {
  withLanguage,
} from '../../hocs';
import Navbar from '../../yggio-components/navbar';
import {
  NavbarParent,
  NavbarSibling,
} from './styled';
import {authApi, removeYggioToken, userApi} from '../../api';
import {objectToQueryString} from '../../utils';
import * as cookies from './utils';

const links = [
  {name: 'Dashboard', url: '/'},
  {name: 'Devices', url: '/devices'},
  // {name: 'Locations', url: '/locations'},
  {name: 'Organizations', url: '/organizations'},
  {name: 'Apps', url: '/apps'},
];

interface NavbarProps extends React.PropsWithChildren {
  router: NextRouter;
  title: string;
  centered: string;
  contentWidth: string;
  currentLanguage: string;
  t(key: string): string;
  changeLanguage(lang: string): void;
}

const BasicNavbarPane = (props: NavbarProps) => {
  const queryClient = useQueryClient();

  const authInfo = authApi.useGetAuthInfo();
  const user = userApi.useTokenUser();
  const {mutate: mutateUpdateUser} = userApi.useUpdateUser(queryClient);

  const signOut = () => {
    removeYggioToken();

    cookies.removeAllCookies();
    const [, pathname] = window.location.pathname.split('/');
    const queryParams = {
      // eslint-disable-next-line camelcase
      redirect_uri: `${window.location.protocol}//${window.location.hostname}/${pathname}`,
    };
    const queryParamsString = objectToQueryString(queryParams);
    window.location.href = `${authInfo.data?.signoutEndpoint}${queryParamsString}`;
  };

  return (
    <NavbarParent>
      <Navbar
        links={links}
        activeLink={`/${_.split(props.router.route, '/')[1]}`}
        router={props.router}
        user={user.data}
        title={props.title}
        centered={props.centered}
        contentWidth={props.contentWidth}
        signOut={signOut}
        t={props.t}
        changeLanguage={props.changeLanguage}
        currentLanguage={props.currentLanguage}
        updateUser={mutateUpdateUser}
      />
      <NavbarSibling>
        {props.children}
      </NavbarSibling>
    </NavbarParent>
  );
};

export default withLanguage({
  withTranslation: true,
  withChangeLanguage: true,
  withCurrentLanguage: true,
})(BasicNavbarPane);

export {
  // basic
  BasicNavbarPane,
  // other relevant subcomponents
  NavbarParent,
  NavbarSibling,
};
