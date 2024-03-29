﻿/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';

// Logic
import {TranslatorPreference} from '../../types';
import {usersApi} from '../../api';
import {selectIdKeyedUsernames} from './selectors';
import {TranslatorsSelectorPage} from './types';

// UI
import ListPage from './sub-components/list-page';
import AddPage from './sub-components/add-page';
import HelpPage from './sub-components/help-page';

interface TranslatorsSelectorProps {
  deviceModelName?: string;
  translatorPreferences: TranslatorPreference[];
  onTranslatorPreferencesChange: (value: TranslatorPreference[]) => void;
  currentPage: TranslatorsSelectorPage;
  onCurrentPageChange: (page: TranslatorsSelectorPage) => void;
}

const TranslatorsSelector = (props: TranslatorsSelectorProps) => {

  const usersQuery = usersApi.useUsersQuery();

  const idKeyedUsernames = selectIdKeyedUsernames({users: usersQuery.data});

  return (
    <>
      {props.currentPage === TranslatorsSelectorPage.list && (
        <ListPage
          onCurrentPageChange={props.onCurrentPageChange}
          translatorPreferences={props.translatorPreferences}
          onTranslatorPreferencesChange={props.onTranslatorPreferencesChange}
          idKeyedUsernames={idKeyedUsernames}
        />
      )}
      {props.currentPage === TranslatorsSelectorPage.add && (
        <AddPage
          onCurrentPageChange={props.onCurrentPageChange}
          deviceModelName={props.deviceModelName}
          translatorPreferences={props.translatorPreferences}
          onTranslatorPreferencesChange={props.onTranslatorPreferencesChange}
          idKeyedUsernames={idKeyedUsernames}
        />
      )}
      {props.currentPage === TranslatorsSelectorPage.help && (
        <HelpPage
          onCurrentPageChange={props.onCurrentPageChange}
        />
      )}

    </>
  );
};

export default TranslatorsSelector;
