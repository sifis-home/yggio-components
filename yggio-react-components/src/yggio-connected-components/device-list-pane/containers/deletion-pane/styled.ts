/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled from 'styled-components';
import {FlexMaxWidthSpaceBetweenWrapper} from '../../../../global/styled';

const DeletionButtonContainer = styled(FlexMaxWidthSpaceBetweenWrapper)`
  height: 100px;
  align-items: flex-end;
`;

const ConfirmationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 30px 0 0 0;
`;

export {
  DeletionButtonContainer,
  ConfirmationContainer,
};
