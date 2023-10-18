/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {compose} from 'lodash/fp';
import PropTypes from 'prop-types';
import {MdKeyboardDoubleArrowLeft as CloseIcon} from 'react-icons/md';

import {withOpenSidebarOnResize} from './effects';
import sidebarState from './state';

import {
  StyledSidebarSibling,
  SidebarContainer,
  ContentSection,
  CloseButton,
} from './styled';

/// / SidebarParent

const SidebarParent = props => (
  <div>
    {props.children}
  </div>
);

SidebarParent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};

/// / SidebarSibling

const SidebarSibling = props => (
  <StyledSidebarSibling isSidebarOpen={props.isSidebarOpen}>
    {props.children}
  </StyledSidebarSibling>
);

SidebarSibling.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

/// / Sidebar

const RawSidebar = props => (
  <SidebarContainer
    isSidebarOpen={props.isSidebarOpen}
    isUsingNavbar={props.isUsingNavbar}
  >
    <ContentSection
      isSidebarOpen={props.isSidebarOpen}
      siblingWidth={props.siblingWidth}
    >
      {props.children}
    </ContentSection>
    <CloseButton
      onClick={props.closeSidebar}
      isSidebarOpen={props.isSidebarOpen}
      siblingWidth={props.siblingWidth}
    >
      <CloseIcon size={16} />
      <p>Close sidebar</p>
    </CloseButton>
  </SidebarContainer>
);

RawSidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  siblingWidth: PropTypes.number.isRequired,
  isUsingNavbar: PropTypes.bool,
  children: PropTypes.node,
};

const Sidebar = compose(
  withOpenSidebarOnResize,
)(RawSidebar);

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  siblingWidth: PropTypes.number.isRequired,
  isUsingNavbar: PropTypes.bool,
  children: PropTypes.node,
};

export {
  SidebarParent,
  Sidebar,
  SidebarSibling,
  sidebarState,
};
