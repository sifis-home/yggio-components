/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';
import {FlexMaxWidthSpaceBetweenWrapper} from '../../../../global/styled';

const ConfigurationButtonContainer = styled(FlexMaxWidthSpaceBetweenWrapper)`
  height: 100px;
  align-items: flex-end;
`;

const TextSpan = styled.span`
  font-size: 0.8em;
`;

export {
  ConfigurationButtonContainer,
  TextSpan,
};
