/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled, {css} from 'styled-components';

interface ContainerProps {
  margin?: string;
  maxWidth?: string;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  margin: ${({margin}) => margin || '0'};
  max-width: ${({maxWidth}) => maxWidth || '100%'};
  font-size: 13px;
`;

interface TableProps {
  showTopBorder: boolean;
}

const Table = styled.div<TableProps>`
  display: grid;
  grid-template-columns: 1fr 1fr 34px 34px;
  margin: 0 0 10px 0;
  ${({showTopBorder}) => showTopBorder && css`
    border-top: 1px solid #bbb;
  `};
`;

const TableHeading = styled.div`
  padding-bottom: 5px;
  font-weight: bold;
  border-bottom: 1px solid #bbb;
`;

interface AddButtonProps {
  disabled: boolean;
}

const AddButton = styled.div<AddButtonProps>`
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed ${({disabled}) => (disabled ? '#bbb' : '#999')};
  border-radius: 3px;
  cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
  color: ${({disabled}) => (disabled ? '#bbb' : 'black')};
  user-select: none;
  &:hover {
    ${({disabled}) => !disabled && css`
      background: #f5f5f5;
    `};
  }
`;

const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
  border-color: #bbb;
  border-style: solid;
  display: flex;
  flex: 1;
  align-items: center;
  padding: 0 0 0 9px;
  color: ${({disabled}) => (disabled ? '#bbb' : 'black')};
`;

interface ParameterValueProps {
  disabled?: boolean;
}

const ParameterValue = styled.div<ParameterValueProps>`
  height: 32px;
  border: 1px solid #bbb;
  border-top: none;
  border-left: none;
  display: flex;
  flex: 1;
  align-items: center;
  padding: 0 0 0 9px;
  color: ${({disabled}) => (disabled ? '#bbb' : 'black')};
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
  border: 1px solid #bbb;
  border-top: none;
  border-left: none;
  background: #eee;
  cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
  color: ${({disabled}) => (disabled ? '#bbb' : '#333')};
  &:hover {
    outline: none;
    ${({disabled, hoverColor}) => !disabled && css`
      color: ${hoverColor || 'black'};
      background: #ddd;
    `};
  }
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  height: 30px;
  width: 100%;
`;

export {
  Container,
  Table,
  TableHeading,
  AddButton,
  SpinnerContainer,
  ParameterName,
  ParameterValue,
  TableButton,
  StyledInput,
};
