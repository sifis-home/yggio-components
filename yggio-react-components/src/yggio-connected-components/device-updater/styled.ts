/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled from 'styled-components';

import ContainerBox from '../../components/container-box';

const StyledContainerBox = styled(ContainerBox)`
  @media (max-width: 500px) {
    height: calc(100vh - 70px);
  }
`;

export {
  StyledContainerBox,
};
