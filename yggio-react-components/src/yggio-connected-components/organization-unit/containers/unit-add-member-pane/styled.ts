/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px 0 0 0;
  h1 {
    font-size: 20px;
    margin: 0 0 20px 0;
  }
`;

const MembersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #eee;
  border-radius: 3px;
  margin: 5px 0;
  padding: 0 10px;
`;

const NoMembersNote = styled.p`
  color: gray;
  font-size: 14px;
`;

export {
  Wrapper,
  MembersContainer,
  NoMembersNote,
};
