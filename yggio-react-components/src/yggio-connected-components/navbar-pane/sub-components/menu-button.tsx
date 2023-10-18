/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {MdOutlineMenu as SidebarIcon} from 'react-icons/md';

import {DROPDOWN_NAMES} from '../constants';
import {ToggleButton} from '../styled';

import type {DropdownName} from '../types';

interface MenuButtonProps {
  openedDropdown: DropdownName | undefined;
  setOpenedDropdown: (name?: DropdownName) => void;
}

const MenuButton = (props: MenuButtonProps) => (
  <ToggleButton
    onClick={() => {
      if (props.openedDropdown === DROPDOWN_NAMES.menu) {
        props.setOpenedDropdown();
      } else {
        props.setOpenedDropdown(DROPDOWN_NAMES.menu);
      }
    }}
  >
    <SidebarIcon size={20} />
  </ToggleButton>
);

export default MenuButton;
