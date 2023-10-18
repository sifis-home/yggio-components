/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled, {css} from 'styled-components';
import {LogTypes} from 'yggio-models';

const Container = styled.div<{margin?: string}>`
  margin: ${({margin}) => margin || '0'};
`;

const HeaderContainer = styled.div`
  margin: 0 0 2px 0;
  background: #f9f9f9;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

const HeaderTopSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px 0;
  padding: 12px;
`;

const HeaderTopLeftSection = styled.div`
  display: flex;
`;

const HeaderTopRightSection = styled.div`
  display: flex;
  align-items: center;
`;

const RefreshNote = styled.p`
  font-size: 12px;
  margin-right: 8px;
  color: #444;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 12px 0 15px 12px;
  border-top: 1px solid #ddd;
`;

const EmptyListContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #777;
`;

const LogsContainer = styled.div<{hideLastBorder?: boolean}>`
  min-height: 300px;
  ${({hideLastBorder}) => hideLastBorder && css`
    > *:last-child {
      border-bottom: 0;
    }
  `}
`;

const MiddleSection = styled.div`
  flex-grow: 1;
  padding: 0 0 0 12px;
`;

const RightSection = styled.div`
  width: 130px;
  align-items: center;
  padding: 12px 0 0 0px;
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
`;

const TopSection = styled.div`
  width: 100%;
  min-height: 30px;
  display: flex;
  padding: 15px 0 5px 0px;
`;

const BottomSection = styled.div`
  width: 100%;
  min-height: 30px;
  padding: 0 0 12px 0px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px 7px;
`;

const LogContainer = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #ddd;
`;

const typeColors: Record<LogTypes.LogType, string> = {
  error: 'red',
  warning: 'orange',
  info: '#aaa',
};

const Type = styled.div<{type: LogTypes.LogType}>`
  width: 10px;
  height: 10px;
  position: relative;
  flex-shrink: 0;
  top: 4px;
  margin: 0 7px 0 0;
  border-radius: 5px;
  background: ${({type}) => typeColors[type]};
`;

const Message = styled.p`
  font-size: 13px;
  font-weight: bold;
`;

const Time = styled.p`
  font-size: 13px;
  color: #555;
  margin: 0 0 3px 0;
`;

const Resource = styled.p`
  font-size: 13px;
  text-decoration: underline;
  cursor: pointer;
`;

const Category = styled.p`
  font-size: 13px;
  color: #555;
`;

const priorityColors: Record<LogTypes.LogPriority, string> = {
  severe: '#F63535',
  high: '#E49700',
  medium: '#0f99d4',
  low: 'gray',
};

const PriorityPill = styled.div<{priority: LogTypes.LogPriority}>`
  height: 18px;
  padding: 0 6px;
  border-radius: 9px;
  line-height: 18px;
  color: white;
  font-size: 11px;
  word-wrap: unset;
  background: ${({priority}) => priorityColors[priority]};
`;

const FooterContainer = styled.div`
  width: 100%;
  padding: 20px 0 0 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FooterSideSection = styled.div<{isHidden?: boolean}>`
  width: 130px;
  display: flex;
  align-items: center;
  justify-content: end;
  visibility: ${({isHidden}) => isHidden ? 'hidden' : 'visible'};
`;

const FooterText = styled.p`
  font-size: 12px;
  color: #555;
`;

const PageSizeSelect = styled.select`
  border: 0;
  color: #333;
  background: none;
  font-size: 11px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export {
  Container,
  HeaderContainer,
  HeaderTopSection,
  HeaderTopLeftSection,
  HeaderTopRightSection,
  RefreshNote,
  FiltersContainer,
  EmptyListContainer,
  LogsContainer,
  LogContainer,
  MiddleSection,
  RightSection,
  TopSection,
  BottomSection,
  Type,
  Message,
  Time,
  Resource,
  Category,
  PriorityPill,
  FooterContainer,
  FooterSideSection,
  PageSizeSelect,
  FooterText,
};
