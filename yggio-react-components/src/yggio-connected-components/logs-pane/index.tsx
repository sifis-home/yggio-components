﻿/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import {useRouter} from 'next/router';
import {MdOutlineDescription as LogsIcon} from 'react-icons/md';

import {CenteredPage} from '../../global/components';
import ContainerBox from '../../components/container-box';
import LogList from '../log-list';
import {Header, Heading} from './styled';

const LogsPane = () => {
  const router = useRouter();
  const shouldStartWithAlarmsFilter = _.has(router.query, 'alarms');
  return (
    <CenteredPage maxWidth='1000px'>
      <Header>
        <LogsIcon size={18} />
        <Heading>Device logs</Heading>
      </Header>
      <ContainerBox padding={'20px 20px 40px 20px'} margin={'0 0 50px 0'}>
        <LogList shouldStartWithAlarmsFilter={shouldStartWithAlarmsFilter} />
      </ContainerBox>
    </CenteredPage>
  );
};

export default LogsPane;
