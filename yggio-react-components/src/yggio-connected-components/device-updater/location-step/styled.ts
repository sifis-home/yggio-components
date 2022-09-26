/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled, {css} from 'styled-components';

import {COLORS} from '../../../constants';

interface TableProps {
  showTopBorder?: boolean;
}

const Table = styled.div<TableProps>`
  display: grid;
  grid-template-columns: 1fr 1fr 34px;
  margin: 0 0 30px 0;
  ${({showTopBorder}) => showTopBorder && css`
    border-top: 1px solid ${COLORS.grey2};
  `};
`;

const TableHeading = styled.div`
  padding-bottom: 5px;
  border-bottom: 1px solid ${COLORS.grey2};
  font-size: 13px;
`;

interface ParameterNameProps {
  disabled?: boolean;
}

const ParameterName = styled.div<ParameterNameProps>`
  height: 32px;
  border-width: 0 1px 1px 0;
  &:nth-child(1n) {
    border-left-width: 1px;
  }
  border-color: ${COLORS.grey2};
  border-style: solid;
  display: flex;
  flex: 1;
  align-items: center;
  padding: 0 0 0 9px;
  color: ${({disabled}) => (disabled ? COLORS.grey2 : 'black')};
`;

interface ParameterValueProps {
  disabled?: boolean;
}

const ParameterValue = styled.div<ParameterValueProps>`
  height: 32px;
  border: 1px solid ${COLORS.grey2};
  border-top: none;
  border-left: none;
  display: flex;
  flex: 1;
  align-items: center;
  padding: 0 0 0 9px;
  color: ${({disabled}) => (disabled ? COLORS.grey2 : 'black')};
`;

interface TableButtonProps {
  disabled?: boolean;
  hoverColor: string;
}

const TableButton = styled.div<TableButtonProps>`
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${COLORS.grey2};
  border-top: none;
  border-left: none;
  background: #eee;
  cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
  color: ${({disabled}) => (disabled ? COLORS.grey2 : '#333')};
  &:hover {
    outline: none;
    ${({disabled, hoverColor}) => !disabled && css`
      color: ${hoverColor || 'black'};
      background: #ddd;
    `};
  }
`;

export {
  Table,
  TableHeading,
  ParameterName,
  ParameterValue,
  TableButton,
};
