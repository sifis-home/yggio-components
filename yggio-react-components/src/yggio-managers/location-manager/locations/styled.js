/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';
import {COLORS} from '../../../constants';

const MapLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const StyledTableItem = styled.div`
  cursor: ${({cursor}) => cursor || 'default'};
`;

const StyledTableRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 5px;
  width: 100%;
  background: ${({background}) => background || COLORS.white};
  color: ${({color}) => color || COLORS.black};
  border-bottom: 2px solid ${COLORS.grey};
  height: 40px;
`;

export {
  MapLoader,
  StyledTableItem,
  StyledTableRow,
}
