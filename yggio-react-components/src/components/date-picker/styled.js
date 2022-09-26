/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// styled

import styled from 'styled-components';
import {commonInputStyles, inputFocusStyle} from '../../global/styled';

const StyledInput = styled.input`
  ${commonInputStyles}
  ${inputFocusStyle}
  height: 35px;
  max-width: ${props => props.maxWidth}
`;

export {
  StyledInput,
};
