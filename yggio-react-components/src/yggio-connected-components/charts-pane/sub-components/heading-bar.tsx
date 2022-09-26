/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {Icon} from 'react-icons-kit';
import {ic_dehaze as SidebarIcon} from 'react-icons-kit/md/ic_dehaze';

import {SIDEBAR_SIBLING_MAX_WIDTH} from '../constants';
import {
  HeadingBarContainer,
  HeadingBarLeftSection,
  HeadingBarMiddleSection,
  ToggleSidebarButton,
} from '../../../global/styled';

interface Props {
  sidebarState: {
    isSidebarOpen: boolean;
    closeSidebar: () => void;
    openSidebar: () => void;
  }
}

const HeadingBar = (props: Props) => {
  return (
    <HeadingBarContainer>
      <HeadingBarLeftSection
        // @ts-ignore because the component is not ts yet
        siblingWidth={SIDEBAR_SIBLING_MAX_WIDTH}
      >
        <ToggleSidebarButton
          onClick={() => {
            if (props.sidebarState.isSidebarOpen) {
              props.sidebarState.closeSidebar();
            } else {
              props.sidebarState.openSidebar();
            }
          }}
        >
          <Icon icon={SidebarIcon as object} size={17} />
        </ToggleSidebarButton>
      </HeadingBarLeftSection>
      <HeadingBarMiddleSection>
        <p>Charts</p>
      </HeadingBarMiddleSection>
    </HeadingBarContainer>
  );
};

export default HeadingBar;
