/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// styled.js

import styled from 'styled-components';

const MembersListContainer = styled.div`
  width: 100%;
  background: 'blue';
  h1 {
    font-size: 18px;
    margin: 0 0 20px 0;
  }
`;

const MemberItemWrapper = styled.div`
  width: 100%;
`;

export {
  MembersListContainer,
  MemberItemWrapper,
};
