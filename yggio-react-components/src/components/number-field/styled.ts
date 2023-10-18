/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled from 'styled-components';
import {commonInputStyles, inputFocusStyle} from '../../global/styled';

interface StyledInputProps {
  disableBlueFocusOutline?: boolean;
  isInvalid?: boolean;
}

const StyledInput = styled.input<StyledInputProps>`
  ${commonInputStyles}
  ${inputFocusStyle}
  height: 35px;
`;

export {
  StyledInput,
};
