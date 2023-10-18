import React from 'react';
import {MdOutlineMenu as SidebarIcon} from 'react-icons/md';

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
          <SidebarIcon size={17} />
        </ToggleSidebarButton>
      </HeadingBarLeftSection>
      <HeadingBarMiddleSection>
        <p>Charts</p>
      </HeadingBarMiddleSection>
    </HeadingBarContainer>
  );
};

export default HeadingBar;
