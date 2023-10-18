/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled, {css} from 'styled-components';

import {SIDEBAR_WIDTH, SMALL_SCREEN_WIDTH} from './constants';

const StyledSidebarSibling = styled.div`
  margin-left: ${({isSidebarOpen}) => (isSidebarOpen ? SIDEBAR_WIDTH : 0)}px;
  transition: margin-left 0.3s;

  @media (max-width: ${SMALL_SCREEN_WIDTH}px) {
    ${({isSidebarOpen}) => isSidebarOpen && css`
      display: none;
    `};
  };
`;

const SidebarContainer = styled.div`
  position: fixed;
  z-index: 5;
  width: ${SIDEBAR_WIDTH}px;
  height: ${({isUsingNavbar}) => (isUsingNavbar ? 'calc(100% - 45px)' : '100%')};
  left: ${({isSidebarOpen}) => (isSidebarOpen ? 0 : -SIDEBAR_WIDTH)}px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, .06);
  flex-shrink: 0;
  transition: left 0.3s, width 0.3s;
  overflow-x: hidden;
  ${({isSidebarOpen}) => isSidebarOpen && css`
    border-right: 1px solid #e7e7e7;
  `};

  @media (max-width: ${SMALL_SCREEN_WIDTH}px) {
    ${({isSidebarOpen}) => isSidebarOpen && css`
      width: 100%;
    `};
  };
`;

const ContentSection = styled.div`
  width: 100%;
  height: calc(100% - 44px);
  box-sizing: border-box;
  overflow-y: auto;
  padding: 20px 20px 0 20px;

  @media (min-width: ${props => props.siblingWidth + SIDEBAR_WIDTH}px) {
    height: 100%;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 44px;
  border-top: 1px solid #ccc;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 13px;
  display: flex;

  &:hover {
    background: #f2f2f2;
  }
  p {
    margin-left: 3px;
    white-space: nowrap;
    overflow: hidden;
  }

  @media (min-width: ${props => props.siblingWidth + SIDEBAR_WIDTH}px) {
    display: none;
  }
`;

export {
  StyledSidebarSibling,
  SidebarContainer,
  ContentSection,
  CloseButton,
};
