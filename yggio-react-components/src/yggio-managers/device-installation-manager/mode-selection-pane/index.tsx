/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {NextRouter} from 'next/router';

import Button from '../../../components/button';
import {StyledContainerBox} from '../sub-components';
import {
  HeadingContainer,
  ButtonsContainer,
  ButtonContainer,
} from './styled';
import {CenteredPage} from '../../../global/components';

interface ModeSelectionPaneProps {
  router: NextRouter;
}

const BasicModeSelectionPane = (props: ModeSelectionPaneProps) => (
  <CenteredPage>
    <StyledContainerBox>
      <Button
        content={'Back'}
        ghosted
        onClick={async () => props.router.push('/devices')}
      />
      <HeadingContainer>
        <h1>Select installation mode</h1>
      </HeadingContainer>
      <ButtonsContainer>
        <ButtonContainer>
          <Button
            color={'green'}
            onClick={async () => props.router.push('/devices/new/single')}
            content={'Single mode'}
            width={'140px'}
          />
          <p>Install one device at a time</p>
        </ButtonContainer>
        <ButtonContainer>
          <Button
            color={'green'}
            onClick={async () => props.router.push('/devices/new/batch')}
            content={'Batch mode'}
            width={'140px'}
          />
          <p>Install multiple devices in one go</p>
        </ButtonContainer>
      </ButtonsContainer>
    </StyledContainerBox>
  </CenteredPage>
);

export default BasicModeSelectionPane;
