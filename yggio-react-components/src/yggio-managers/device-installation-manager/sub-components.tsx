/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';

import ContainerBox from '../../components/container-box';

const StyledContainerBox = (props: {children: React.ReactNode}) => (
  <ContainerBox padding={'30px'} margin={'0 0 5% 0'}>
    {props.children}
  </ContainerBox>
);

export {
  StyledContainerBox,
};
