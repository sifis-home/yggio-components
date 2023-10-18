/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled, {css} from 'styled-components';

const SearchResultContainer = styled.div`
  margin: 30px 0 0 0;
  height: 200px;
  overflow-y: auto;
`;

interface SearchResultItemProps {
  active?: boolean;
  isLarge: boolean;
}

const SearchResultItem = styled.div<SearchResultItemProps>`
  width: 100%;
  height: ${({isLarge}) => isLarge ? 52 : 46}px;
  padding: 0 0 0 10px;
  display: flex;
  align-items: center;
  border-color: #999;
  border-style: solid;
  border-width: 0 1px 1px 1px;
  cursor: pointer;
  background: ${({active}) => active ? '#256fb8' : 'white'};

  &:first-child {
    border-top-width: 1px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  &:hover {
    ${({active}) => !active && css`
      background: #eee;
    `}
  }
`;

interface SearchResultItemTitlesProps {
  active?: boolean;
}

const SearchResultItemTitle = styled.p<SearchResultItemTitlesProps>`
  margin: 0;
  font-size: 13px;
  color: ${({active}) => active ? 'white' : 'black'};
`;

const SearchResultItemSubtitle = styled.p<SearchResultItemTitlesProps>`
  margin: 0;
  color: #666;
  color: ${({active}) => active ? 'white' : '#555'};
  font-size: 12px;
`;

const SearchResultCenterer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  color: #555;
  font-size: 16px;
  font-style: italic;
`;

export {
  SearchResultContainer,
  SearchResultItem,
  SearchResultItemTitle,
  SearchResultItemSubtitle,
  SearchResultCenterer,
};
