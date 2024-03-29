﻿/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useState} from 'react';

// Logic
import {TranslatorPreference} from '../../../../types';

// UI
import Button from '../../../../components/button';
import TranslatorsSelector from '../../../../yggio-connected-components/translators-selector';
import {TranslatorsSelectorPage} from '../../../../yggio-connected-components/translators-selector/types';
import {StyledContainerBox} from '../../sub-components';
import {
  ContentContainer,
  NavButtonsContainer,
} from '../../styled';

interface TranslatorPaneProps {
  incrementCurrentStep: () => void;
  onBack: () => void;
  translatorPreferences: TranslatorPreference[];
  setTranslatorPreferences: (tp: TranslatorPreference[]) => void;
  deviceModelName?: string;
}

const TranslatorPane = (props: TranslatorPaneProps) => {

  const [page, setPage] = useState(TranslatorsSelectorPage.list);

  return (
    <StyledContainerBox>
      <ContentContainer padding='0 0 35px 0'>
        <TranslatorsSelector
          deviceModelName={props.deviceModelName}
          translatorPreferences={props.translatorPreferences}
          onTranslatorPreferencesChange={(newTranslatorPreferences: TranslatorPreference[]) => {
            props.setTranslatorPreferences(newTranslatorPreferences);
          }}
          currentPage={page}
          onCurrentPageChange={(page: TranslatorsSelectorPage) => setPage(page)}
        />
      </ContentContainer>
      {page === TranslatorsSelectorPage.list && (
        <NavButtonsContainer>
          <Button
            content={'Back'}
            ghosted
            onClick={props.onBack}
          />
          <Button
            color={'green'}
            content={'Continue'}
            onClick={props.incrementCurrentStep}
          />
        </NavButtonsContainer>
      )}
    </StyledContainerBox>
  );
};

export default TranslatorPane;
