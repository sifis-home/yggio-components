/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled from 'styled-components';

const Section = styled.div`
  margin: 0 0 30px 0;
`;

const NumItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 7px 0;
  p {
    margin: 0 0 0 8px;
    font-size: 13px;
    font-weight: 500;
  }
`;

const TopError = styled.li`
  margin: 5px 0;
`;

export {
  Section,
  NumItem,
  TopError,
};
