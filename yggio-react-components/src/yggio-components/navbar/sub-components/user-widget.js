/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {Icon} from 'react-icons-kit';
import {ic_person as userIcon} from 'react-icons-kit/md/ic_person';
import {getConfig} from '../../../yggio-config';

import {
  NavButtonWithDropdown,
  NavButton,
  Dropdown,
  DropdownHeading,
  DropdownButton,
} from '../styled';

const UserWidget = props => (
  <NavButtonWithDropdown data-cy='profile-button'>
    <NavButton
      onClick={() => (
        props.isShowingUserDropdown
          ? props.closeAllDropdowns()
          : props.showUserDropdown()
      )}
      isActive={props.isShowingUserDropdown}
    >
      <Icon icon={userIcon} size={18} />
    </NavButton>
    {props.isShowingUserDropdown &&
      <Dropdown>
        <DropdownHeading data-cy="profile-dropdown-menu-header" wordBreak="break-all">
          {props.username || '- no user -'}
        </DropdownHeading>
        <DropdownButton
          onClick={() => {
            window.location = `https://${getConfig().domain}/auth/realms/yggio/account`;
          }}
          data-cy='profile-dropdown-menu-manage-account'
        >
          Manage account
        </DropdownButton>
        <DropdownButton onClick={props.signOut} data-cy='profile-dropdown-menu-sign-out'>
          {_.capitalize(props.t('labels.signOut'))}
        </DropdownButton>
      </Dropdown>}
  </NavButtonWithDropdown>
);

export default UserWidget;
