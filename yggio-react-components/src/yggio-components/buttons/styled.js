/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';
import {COLORS} from '../../constants';

const IconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${COLORS.transparent};
  border-radius: 2px;
  color: ${COLORS.black};
  transition: color 0.2s;

  &:hover {
    transition: color 0.2s;
    color: ${COLORS.greenLight};
  }
`;

export {
  IconWrapper,
};
