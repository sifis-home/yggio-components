/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled from 'styled-components';

const Section = styled.div`
  margin: 0 0 40px 0;
`;

const Heading = styled.div`
  padding: 0 0 2px 0;
  display: flex;
  align-items: center;
  color: #333;
  border-bottom: 1px solid #ccc;
  margin: 0 0 15px 0;
  p {
    margin: 0;
  }
`;

export {
  Section,
  Heading,
};
