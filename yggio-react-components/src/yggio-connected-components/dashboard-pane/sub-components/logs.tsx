/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';

import ContainerBox from '../../../components/container-box';
import LogList from '../../log-list';
import {LogsWrapper, LogsHeading} from '../styled';

const Logs = () => {
  return (
    <LogsWrapper>
      <ContainerBox
        width={'100%'}
        minHeight={'400px'}
      >
        <LogsHeading>Latest device activity</LogsHeading>
        <LogList
          showOnlyList
          pageSize={5}
        />
      </ContainerBox>
    </LogsWrapper>
  );
};

export default Logs;
