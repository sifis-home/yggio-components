/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';
import {Icon} from 'react-icons-kit';

const SpinnerIcon = styled(Icon)`
  color: ${({color}) => color};
  margin: ${({margin}) => margin};
  animation: spin ${({speed}) => speed}s linear infinite;
  @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`;

export {
  SpinnerIcon,
};
