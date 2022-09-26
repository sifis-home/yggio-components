/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {Icon} from 'react-icons-kit';
import {ic_dehaze as SidebarIcon} from 'react-icons-kit/md/ic_dehaze';

import {Translate} from '../../../types';
import {
  HeadingBarContainer,
  HeadingBarLeftSection,
  HeadingBarMiddleSection,
  ToggleSidebarButton,
} from '../../../global/styled';

interface HeadingBarProps {
  isSidebarOpen: boolean;
  siblingWidth: number;
  closeSidebar: () => void;
  openSidebar: () => void;
  tabId: string;
  t: Translate;
}

const HeadingBar = (props: HeadingBarProps) => {
  return (
    <HeadingBarContainer>
      {/* @ts-ignore component not yet typescripted */}
      <HeadingBarLeftSection siblingWidth={props.siblingWidth}>
        <ToggleSidebarButton
          onClick={() => {
            if (props.isSidebarOpen) {
              props.closeSidebar();
            } else {
              props.openSidebar();
            }
          }}
        >
          <Icon icon={SidebarIcon as object} size={17} />
        </ToggleSidebarButton>
      </HeadingBarLeftSection>
      <HeadingBarMiddleSection>
        <p>{_.capitalize(props.t(`titles.${props.tabId}`))}</p>
      </HeadingBarMiddleSection>
    </HeadingBarContainer>
  );
};

export default HeadingBar;
