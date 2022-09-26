/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  font-size: 13px;
`;

const SuccessMessage = styled.p`
  color: #333;
  font-size: 15px;
  font-weight: 500;
`;

export {
  ContentContainer,
  SuccessMessage,
};
