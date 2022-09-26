/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {Icon} from 'react-icons-kit';
import {ic_language as languageIcon} from 'react-icons-kit/md/ic_language';

import {
  NavButtonWithDropdown,
  NavButton,
  Dropdown,
  DropdownHeading,
  DropdownButton,
} from '../styled';

const LanguageWidget = props => (
  <NavButtonWithDropdown>
    <NavButton
      onClick={() => (
        props.isShowingLanguageDropdown
          ? props.closeAllDropdowns()
          : props.showLanguageDropdown()
      )}
      isActive={props.isShowingLanguageDropdown}
      data-cy='language-selection'
    >
      <Icon icon={languageIcon} size={16} />
    </NavButton>
    {props.isShowingLanguageDropdown &&
      <Dropdown>
        <DropdownHeading>Language</DropdownHeading>
        <DropdownButton
          onClick={() => {
            props.changeLanguage('en');
            props.updateUser({updates: {...props.user, language: 'en'}});
          }}
          active={props.currentLanguage === 'en'}
          data-cy='language-english-button'
        >
          English
        </DropdownButton>
        <DropdownButton
          onClick={() => {
            props.changeLanguage('de');
            props.updateUser({updates: {...props.user, language: 'de'}});
          }}
          active={props.currentLanguage === 'de'}
          data-cy='language-german-button'
        >
          German
        </DropdownButton>
      </Dropdown>}
  </NavButtonWithDropdown>
);

export default LanguageWidget;
