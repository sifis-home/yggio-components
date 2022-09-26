/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// styled.js

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0 0 0;
  h1 {
    font-size: 18px;
    margin: 0 0 20px 0;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 15px;
`;

export {
  Wrapper,
  ButtonsContainer,
};
