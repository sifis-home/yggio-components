﻿/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';

import Button from '../button';
import {FooterContainer} from './styled';

interface FooterProps {
  onContinue: () => void;
  onBack?: () => void;
  hideBackButton?: boolean;
  disableContinueButton?: boolean;
  continueButtonText?: string;
  showContinueButtonSpinner?: boolean;
  continueButtonWidth?: string;
}

const Footer = (props: FooterProps) => {
  return (
    <FooterContainer>
      <div>
        {!props.hideBackButton && (
          <Button
            label='Back'
            onClick={props.onBack}
            height={'38px'}
          />
        )}
      </div>
      <div>
        <Button
          label={props.continueButtonText || 'Continue'}
          color={'green'}
          onClick={props.onContinue}
          disabled={props.disableContinueButton}
          isLoading={props.showContinueButtonSpinner}
          width={props.continueButtonWidth || '100px'}
          height={'38px'}
        />
      </div>
    </FooterContainer>
  );
};

export default Footer;
