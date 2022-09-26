/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';

const SearchBar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 20px 0 0 0;

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: start;
  }
`;

const HeadingBar = styled.div`
  height: 55px;
`;

const Heading = styled.p`
  font-size: 17px;
  margin: 0;
`;

const SubHeading = styled.p`
  font-size: 13px;
  margin: 3px 0 0 0;
  color: #555;
`;

const AppsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 20px;
`;

const AppContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  padding: 10px;
  display: flex;
  border-radius: 3px;
  cursor: pointer;
  @media (min-width: 1000px) {
    width: calc(50% - 10px);
  }
  &:hover {
    background: #f7f7f7;
  }
`;

interface AppIconProps {
  showBackground: boolean;
}

const AppIcon = styled.div<AppIconProps>`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 16px 0 0;
  flex-shrink: 0;
  background: ${({showBackground}) => (showBackground ? '#ddd' : 'none')};
`;

const AppInfoContainer = styled.div`
  width: calc(100% - 90px);
`;

const AppName = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 2px 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AppTagline = styled.p`
  margin: 0;
  font-size: 13px;
  margin: 0 0 12px 0;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TagsContainer = styled.div`
  display: flex;
  overflow-x: hidden;
`;

const NoAppsNote = styled.p`
  width: 100%;
  text-align: center;
  color: #777;
`;

export {
  SearchBar,
  HeadingBar,
  Heading,
  SubHeading,
  AppsContainer,
  AppContainer,
  AppIcon,
  AppInfoContainer,
  AppName,
  AppTagline,
  TagsContainer,
  NoAppsNote,
};
