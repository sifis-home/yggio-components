/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {Icon} from 'react-icons-kit';
import {ic_menu_book as docsIcon} from 'react-icons-kit/md/ic_menu_book';
import {getExternalUrls} from '../../../constants';

import {
  NavButtonWithDropdown,
  NavButton,
  Dropdown,
  DropdownButton,
} from '../styled';

const DocsWidget = props => (
  <NavButtonWithDropdown>
    <NavButton
      onClick={() => (
        props.isShowingDocsDropdown
          ? props.closeAllDropdowns()
          : props.showDocsDropdown()
      )}
      isActive={props.isShowingDocsDropdown}
    >
      <Icon icon={docsIcon} size={18} />
    </NavButton>
    {props.isShowingDocsDropdown && (
      <Dropdown>
        <DropdownButton onClick={() => window.open(getExternalUrls().docs, '_blank')}>
          Yggio Docs
        </DropdownButton>
        <DropdownButton onClick={() => window.open(getExternalUrls().swagger, '_blank')}>
          Yggio Swagger
        </DropdownButton>
        <DropdownButton onClick={() => window.open(getExternalUrls().webshop, '_blank')}>
          Sensative Webshop
        </DropdownButton>
      </Dropdown>
    )}
  </NavButtonWithDropdown>
);

export default DocsWidget;
