/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {MdLanguage as LanguageIcon} from 'react-icons/md';
import {useTranslation} from 'react-i18next';

import {userApi} from '../../../api';
import {DROPDOWN_NAMES} from '../constants';
import {
  NavButtonWithDropdown,
  NavButton,
  Dropdown,
  DropdownHeading,
  DropdownButton,
} from '../styled';

import type {DropdownName} from '../types';

interface LanguageWidgetProps {
  openedDropdown: DropdownName | undefined;
  setOpenedDropdown: (name?: DropdownName) => void;
  user?: {
    username: string;
  };
}

const LanguageWidget = (props: LanguageWidgetProps) => {
  const {i18n} = useTranslation();
  const queryClient = useQueryClient();
  const updateUserMutation = userApi.useUpdateUser(queryClient);
  const isOpen = props.openedDropdown === DROPDOWN_NAMES.language;
  return (
    <NavButtonWithDropdown>
      <NavButton
        onClick={() => (
          isOpen
            ? props.setOpenedDropdown()
            : props.setOpenedDropdown(DROPDOWN_NAMES.language)
        )}
        isActive={isOpen}
        data-cy='language-selection'
      >
        <LanguageIcon size={16} />
      </NavButton>
      {isOpen &&
        <Dropdown>
          <DropdownHeading>Language</DropdownHeading>
          <DropdownButton
            onClick={async () => {
              await i18n.changeLanguage('en');
              updateUserMutation.mutate({updates: {...props.user, language: 'en'}});
            }}
            active={i18n.language === 'en'}
            data-cy='language-english-button'
          >
            English
          </DropdownButton>
          <DropdownButton
            onClick={async () => {
              await i18n.changeLanguage('de');
              updateUserMutation.mutate({updates: {...props.user, language: 'de'}});
            }}
            active={i18n.language === 'de'}
            data-cy='language-german-button'
          >
            German
          </DropdownButton>
        </Dropdown>}
    </NavButtonWithDropdown>
  );
};

export default LanguageWidget;
