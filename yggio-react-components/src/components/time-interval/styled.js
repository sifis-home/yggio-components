/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// styled
import styled from 'styled-components';

const TitleContainer = styled.div`
  font-family: Lato, Arial, sans-serif;
  display: grid;
  grid-template-columns: 126px 126px 126px;
  font-size: 13px;
  margin-left: 5px;
`;

const TableTitle = styled.div`
  margin: 0 0 5px 0;
`;

const ColonContainer = styled.div`
  display: inline-block;
  margin: 0 10px 0 10px;
  font-size: 25px;
`;

const TimeIntervalContainer = styled.div`
  display: flex;
`;

export {
  TitleContainer,
  TableTitle,
  ColonContainer,
  TimeIntervalContainer,
};
