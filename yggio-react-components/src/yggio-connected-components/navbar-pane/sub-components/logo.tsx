﻿/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {NextRouter} from 'next/router';

import {DEFAULTS} from '../constants';
import LogoIcon from '../../../components/logo';
import YGGIO_LOGO from '../../../assets/images/yggio-icon.svg';
import {Title, NavButton} from '../styled';

interface LogoProps {
  router: NextRouter;
  title?: string;
}

const Logo = (props: LogoProps) => (
  <NavButton
    data-cy='yggio-logo'
    onClick={async () => props.router.push('/')}
  >
    <LogoIcon
      src={YGGIO_LOGO}
      alt={'Yggio'}
      height={'21px'}
      width={'21px'}
      margin={'0 9px 0 0'}
    />
    <Title>
      {props.title || DEFAULTS.title}
    </Title>
  </NavButton>
);

export default Logo;
