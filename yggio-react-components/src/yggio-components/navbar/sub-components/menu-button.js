/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {Icon} from 'react-icons-kit';
import {ic_menu as toggleIcon} from 'react-icons-kit/md/ic_menu';

import {ToggleButton} from '../styled';

const MenuButton = props => (
  <ToggleButton
    onClick={() => {
      if (props.isShowingMenuDropdown) {
        props.closeAllDropdowns();
      } else {
        props.showMenuDropdown();
      }
    }}
  >
    <Icon icon={toggleIcon} size={20} />
  </ToggleButton>
);

export default MenuButton;
