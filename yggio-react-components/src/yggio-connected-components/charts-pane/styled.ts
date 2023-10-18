/*
 * Copyright 2023 Sensative AB
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
  flex-shrink: 0;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

const SearchedDevicesContainer = styled.div`
  margin: 0 0 20px 0;
  box-shadow: 0px 0px 4px #ccc;
  position: absolute;
  background: white;
  width: calc(100% - 40px);
  box-sizing: border-box;
  z-index: 1;
`;

const NoSearcedDevicesBox = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: #777;
  padding: 0 3px 0 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 0px 4px #ccc;
`;

const SearchedDevice = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-top: none;
  height: 40px;
  width: 100%;
  padding: 0 3px 0 8px;
  font-size: 13px;
  cursor: pointer;
  &:first-child {
    border-top: 1px solid #ccc;
    border-radius: 4px 4px 0 0;
  }
  &:last-child {
    border-radius: 0 0 4px 4px;
  }
  &:hover {
    background: #f5f5f5;
  }
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export {
  SidebarSection,
  SidebarTitle,
  ListEntry,
  ListEntryTitle,
  RemoveButton,
  NoSourceView,
  SearchedDevicesContainer,
  SearchedDevice,
  NoSearcedDevicesBox,
};
