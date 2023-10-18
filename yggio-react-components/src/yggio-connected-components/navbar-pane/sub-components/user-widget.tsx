/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import {MdPerson as UserIcon} from 'react-icons/md';
import {useTranslation} from 'react-i18next';

import {getConfig} from '../../../yggio-config';
import {DROPDOWN_NAMES} from '../constants';
import {objectToQueryString} from '../../../utils';
import {removeAllCookies} from '../utils';
import {authApi, removeYggioToken} from '../../../api';
import {
  NavButtonWithDropdown,
  NavButton,
  Dropdown,
  DropdownHeading,
  DropdownButton,
} from '../styled';

import type {DropdownName} from '../types';

interface UserWidgetProps {
  openedDropdown: DropdownName | undefined;
  setOpenedDropdown: (name?: DropdownName) => void;
  username?: string;
}

const UserWidget = (props: UserWidgetProps) => {

  const {t} = useTranslation();

  const isOpen = props.openedDropdown === DROPDOWN_NAMES.user;

  const authInfo = authApi.useGetAuthInfo();

  const signOut = () => {
    removeYggioToken();

    removeAllCookies();
    const [, pathname] = window.location.pathname.split('/');
    const queryParams = {
      // eslint-disable-next-line camelcase
      redirect_uri: `${window.location.protocol}//${window.location.hostname}/${pathname}`,
    };
    const queryParamsString = objectToQueryString(queryParams);
    window.location.href = `${authInfo.data?.signoutEndpoint}${queryParamsString}`;
  };

  return (
    <NavButtonWithDropdown data-cy='profile-button'>
      <NavButton
        onClick={() => (
          isOpen
            ? props.setOpenedDropdown()
            : props.setOpenedDropdown(DROPDOWN_NAMES.user)
        )}
        isActive={isOpen}
      >
        <UserIcon size={18} />
      </NavButton>
      {isOpen &&
      <Dropdown>
        <DropdownHeading data-cy="profile-dropdown-menu-header" wordBreak="break-all">
          {props.username || '- no user -'}
        </DropdownHeading>
        <DropdownButton
          onClick={() => {
            window.location.href = `https://${getConfig().domain}/auth/realms/yggio/account`;
          }}
          data-cy='profile-dropdown-menu-manage-account'
        >
          Manage account
        </DropdownButton>
        <DropdownButton onClick={signOut} data-cy='profile-dropdown-menu-sign-out'>
          {_.capitalize(t('labels.signOut'))}
        </DropdownButton>
      </Dropdown>}
    </NavButtonWithDropdown>
  );
};

export default UserWidget;
