/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';

const Container = styled.div`
  width: 20px;
  height: 20px;
  margin: ${({margin}) => margin || '0'};
  display: flexbox;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: #f5f5f5;
  }
`;

const Icon = styled.img`
  display: block;
  height: 12px;

`;

export {
  Container,
  Icon,
};
