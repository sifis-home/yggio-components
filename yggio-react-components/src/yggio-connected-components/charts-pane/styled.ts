/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';

const SidebarTitle = styled.p`
  margin: 0 0 10px 0;
  font-weight: bold;
  font-size: 14px;
`;

const SidebarSection = styled.div`
  margin: 10px 0 30px 0;
`;

const ListEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  padding: 0 5px 0 10px;
  height: 40px;
  background: #f5f5f5;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  margin: 0 0 6px 0;
`;

const RemoveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  cursor: pointer;
  color: #333;
  &:hover {
    background: #e5e5e5;
    color: black;
  }
`;

interface ListEntryTitleProps {
  redColor?: boolean;
}

const ListEntryTitle = styled.p<ListEntryTitleProps>`
  font-size: 14px;
  color: ${({redColor}) => (redColor ? 'red' : 'black')};
`;

const NoSourceView = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #555;
  font-style: italic;
  h3 {
    font-size: 15px;
    font-weight: normal;
    margin: 0 0 10px 0;
  }
  p {
    font-size: 14px;
    margin: 0px;
  }
`;

export {
  SidebarSection,
  SidebarTitle,
  ListEntry,
  ListEntryTitle,
  RemoveButton,
  NoSourceView,
};
