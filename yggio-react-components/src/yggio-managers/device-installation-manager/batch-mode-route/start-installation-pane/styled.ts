/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled from 'styled-components';

const Container = styled.div`
  margin: 30px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Note = styled.p`
  margin: 0 0 10px 0;
  font-size: 13px;
  text-align: center;
`;

export {
  Container,
  Note,
};
