/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// styled.js

import styled from 'styled-components';

const DevicesListContainer = styled.div`
  width: 100%;
  h1 {
    font-size: 18px;
    margin: 0 0 20px 0;
  }
`;

const DeviceTable = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 3px;
  font-size: 14px;
`;

const TableCell = styled.div`
  background: #f2f2f2;
  margin-bottom: 2px;
  padding: 8px 0 8px 8px;
`;

const HeaderCell = styled.div`
  background: #e2e2e2;
  margin-bottom: 2px;
  padding: 8px 0 8px 8px;
  font-weight: bold;
`;

export {
  DevicesListContainer,
  DeviceTable,
  TableCell,
  HeaderCell,
};
