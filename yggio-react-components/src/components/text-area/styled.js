/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';

import {commonInputStyles, inputFocusStyle} from '../../global/styled';
import {DEFAULTS} from './constants';

const StyledInput = styled.textarea`
  ${commonInputStyles}
  ${inputFocusStyle}
  height: ${({height}) => height || DEFAULTS.height};
  padding-top: 10px;
  resize: ${({resize}) => resize || DEFAULTS.resize};
`;

export {
  StyledInput,
};
