/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import styled, {css} from 'styled-components';
import Icon from 'react-icons-kit';

import {FlexWrapper} from '../../global/styled';
import {COLORS} from '../../constants';
import {TABLE_ROW_HEIGHT, COLUMNS} from './constants';

// GENERAL
const MainContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const MainContentContainer = styled.div`
  width: 100%;
  max-width: ${({maxWidth}) => maxWidth}px;
  padding: 30px 20px 60px;
  box-sizing: border-box;

  @media (max-width: 700px) {
    padding: 10px 10px 60px;
  };
`;

const SmallScreenHider = styled.div`
  display: none;

  @media (min-width:1100px)  {
    display: flex;
  }
`;

const BigScreenHider = styled.div`
  display: flex;

  @media (min-width:1100px)  {
    display: none;
  }
`;

// HEADING BAR

const HeadingTitle = styled.p`
  font-weight: bold;
`;

const NumDevicesPill = styled.div`
  position: relative;
  top: 1px;
  padding: 0 5px;
  height: 16px;
  margin: 0 0 0 8px;
  background: #d7d7d7;
  border-radius: 8px;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;


// FILTER BAR

const FilterBarContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 11px 0 5px 0;
  margin: 0 0 5px 0;
  border-top: 1px solid #ccc;
  flex-wrap: wrap;
`;

const FilterBarLeftSection = styled.div`
  width: 80px;
  height: 30px;
  display: flex;
  font-size: 12px;
  align-items: center;

  @media (max-width: 1560px) {
    display: none;
  }
`;

const FilterBarMiddleSection = styled.div`
  width: 100px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  overflow: auto;
  flex-wrap: nowrap;

  /* Hide scrollbar */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterBarRightSection = styled.div`
  width: fit-content;
  padding: 0 0 0 10px;
  height: 30px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  p {
    font-size: 12px;
    margin: 0;
  }
`;

// SELECTION BAR

const SelectionBarContainer = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  margin: 0 0 14px 0;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
`;

const SelectionBarLeftSection = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  align-items: center;
  p {
    margin: 0;
    font-size: 13px;
  }
`;

const NumSelectedText = styled.span`
  color: ${({noDevices}) => (noDevices ? 'black' : 'blue')};
  font-weight: ${({noDevices}) => (noDevices ? 'normal' : 'bold')};
  margin: 0 5px 0 0;
`;

const SelectionBarRightSection = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const SelectAllLabel = styled.p`
  font-size: 12px;
  margin: 0 0 0 3px;

  @media (max-width: 700px) {
    display: none;
  }
`;

// SIDEBAR

const SidebarHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
`;

const SidebarHeadingLeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const SidebarHeadingTitle = styled.p`
  font-size: 13px;
  margin: 0 0 0 5px;
  font-weight: bold;
  position: relative;
  top: 1px;
`;

const CollapsableButton = styled.div`
  cursor: pointer;
  justify-content: space-between;
  color: ${COLORS.greyDark};
  display: flex;
  height: 44px;
  font-size: 13px;
  align-items: center;
  border-top: 1px solid #E1E1E1;
`;

const CollapsableButtonIconWrapper = styled.div`
  color: #666;
`;

const TypeWrapper = styled(FlexWrapper)`
  margin: 6px 0 0 0;
  font-size: 0.8em;
`;

const TypeCheckbox = styled.input`
  margin: 0 6px 0 0;
  position: relative;
  top: 2px;
`;

// TABLE OPTIONS

const ListOptionsButtonsRow = styled.div`
  display: flex;

  @media (min-width:800px)  {
    height: auto;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const HorizontalLine = styled.div`
  display: none;

  @media (min-width:800px)  {
    display: flex;
    height: 100%;
    margin: 5px;
    width: 1px;
    background: ${COLORS.greyLight};
  }
`;

const LabelsSelectedRow = styled(FlexWrapper)`
  justify-content: center;
  align-items: center;
  font-size: 0.6em;

  @media (min-width:800px)  {
    font-size: 0.8em;
  }
`;
// TABLE

const TableContainer = styled.div`
  width: 100%;
  display: grid;
  grid-auto-rows: ${TABLE_ROW_HEIGHT}px;
  font-size: 12px;
  grid-template-columns: ${({columns, selectMode}) => {
    const selected = _.pick(COLUMNS, columns);
    let items = _.map(selected, 'width');
    if (selectMode) {
      items = ['50px', ...items];
    }
    return _.join(items, ' ');
  }};
`;

const TableItem = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid #E1E1E1;
  height: 100%;
  display: flex;
  padding-right: 20px;
  justify-content: ${({align}) => (align === 'right' ? 'flex-end' : 'flex-start')};
  text-align: ${({align}) => (align === 'right' ? 'right' : 'left')};
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  &:first-child {
    padding-left: 16px;
  }
  &:last-child {
    padding-right: 16px;
  }
  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const TableHeadingItem = styled(TableItem)`
  font-weight: bold;
`;

const HeadingRow = styled.div`
  display: contents;
`;

const TableRow = styled.div`
  display: contents;
  ${({selectMode}) => selectMode && css`
      cursor: pointer;
  `}
  ${TableItem} {
    ${({isSelected}) => isSelected && css`
      background: #ecf3fc;
    `}
  }
  &:hover ${TableItem} {
    background: ${({isSelected}) => (isSelected ? '#e1edfa' : '#f5f5f5')};
  }
`;

const StyledCheckbox = styled.input`
  margin: 0;
`;

const DeviceName = styled.p`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ValueChip = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${COLORS.greyLightAlt};
  font-size: 0.8em;
  margin: 0 5px 0 0;
  padding: 0 5px 0;
  height: 20px;
  border-radius: 15px;
  white-space: nowrap;
`;

const TableFooter = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px 0 16px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 1px solid ${COLORS.greyAlt}
`;

const TableFooterLeftSection = styled.div`
  font-size: 12px;
  color: #555;
  display: flex;
  align-items: center;
  height: 60px;
`;

const PageInfo = styled.p`
  margin: 0;
  margin: 0 40px 0 0;
`;

const SetPageSizeContainer = styled.div`
`;

const PageSizeSelect = styled.select`
  border: 0;
  background: none;
  font-size: 11px;
  cursor: pointer;
  position: relative;
  top: 1px;
  &:focus {
    outline: none;
  }
`;

const TableFooterRightSection = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
`;

const EmptyTableView = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #555;
  font-size: 15px;
`;

// CUSTOMIZE COLUMNS POPUP

const CustomizeColumnsHeader = styled.div`
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  font-size: 15px;
  padding: 0 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e7e7e7;
`;

const CustomizeColumnsMainSection = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 320px;
  overflow-y: scroll;
  padding: 20px 17px 0;
  border-bottom: 1px solid #e7e7e7;
`;

const CustomizeColumnsFooter = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  height: 78px;
  padding: 20px 17px 0;
`;

const CustomizeColumnsItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  height: 36px;
  padding: 0 10px 0 13px;
  margin: 0 0 7px 0;
  border-radius: 4px;
  background: #f1f1f1;
  align-items: center;
  color: ${({disabled}) => (disabled ? '#aaa' : 'black')};
  p {
    margin: 0;
  }
`;

const CustomizeColumnsItemButton = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({margin}) => margin || '0'};
  color: ${({disabled}) => (disabled ? '#bbb' : '#111')};
  cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
  &:hover {
    background: ${({disabled}) => (disabled ? 'none' : '#dadada')};
  }
`;

const AccessRightIcon = styled(Icon)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin: 0 1px 0;
  height: 15px;
  min-width: 15px;
  color: ${({hasRight}) => (hasRight ? COLORS.greyDarkAlt : COLORS.greyLight)};
`;

export {
  // GENERAL
  MainContentWrapper,
  MainContentContainer,
  SmallScreenHider,
  BigScreenHider,

  // HEADING BAR
  HeadingTitle,
  NumDevicesPill,

  // FILTER BAR
  FilterBarContainer,
  FilterBarLeftSection,
  FilterBarMiddleSection,
  FilterBarRightSection,

  // SELECTION BAR
  SelectionBarContainer,
  SelectionBarLeftSection,
  NumSelectedText,
  SelectionBarRightSection,
  SelectAllLabel,

  // SIDEBAR
  SidebarHeading,
  SidebarHeadingLeftSection,
  SidebarHeadingTitle,
  CollapsableButton,
  CollapsableButtonIconWrapper,
  TypeWrapper,
  TypeCheckbox,

  // TABLE OPTIONS
  ListOptionsButtonsRow,
  HorizontalLine,
  LabelsSelectedRow,

  // TABLE
  TableContainer,
  TableItem,
  TableHeadingItem,
  HeadingRow,
  TableRow,
  StyledCheckbox,
  DeviceName,
  ValueChip,
  TableFooter,
  TableFooterLeftSection,
  PageInfo,
  SetPageSizeContainer,
  PageSizeSelect,
  TableFooterRightSection,
  EmptyTableView,

  // CUSTOMIZE COLUMNS POPUP
  CustomizeColumnsHeader,
  CustomizeColumnsMainSection,
  CustomizeColumnsFooter,
  CustomizeColumnsItem,
  CustomizeColumnsItemButton,
  AccessRightIcon,
};
