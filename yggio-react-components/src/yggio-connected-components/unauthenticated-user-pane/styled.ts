/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  justify-content: center;
  margin: 10% 0 0 0;
`;

const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const LogoContainer = styled.div`
  padding: 5px;
`;

export {
  Box,
  LoginContent,
  LogoContainer,
};
