import React from 'react';
import _ from 'lodash';
import {MdOutlineMenu as SidebarIcon} from 'react-icons/md';
import {useTranslation} from 'react-i18next';

import {TabItem} from '../types';
import {
  HeadingBarContainer,
  HeadingBarLeftSection,
  HeadingBarMiddleSection,
  HeadingBarMiddleIcon,
  ToggleSidebarButton,
} from '../../../global/styled';

interface HeadingBarProps {
  isSidebarOpen: boolean;
  siblingWidth: number;
  closeSidebar: () => void;
  openSidebar: () => void;
  tabItem: TabItem;
}

const HeadingBar = (props: HeadingBarProps) => {
  const {t} = useTranslation();
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
          <SidebarIcon size={17} />
        </ToggleSidebarButton>
      </HeadingBarLeftSection>
      <HeadingBarMiddleSection>
        {/* @ts-ignore component not yet typescripted */}
        <HeadingBarMiddleIcon siblingWidth={props.siblingWidth}>
          <props.tabItem.icon.file size={props.tabItem.icon.size} />
        </HeadingBarMiddleIcon>
        <p>{_.capitalize(t(`titles.${props.tabItem.path}`))}</p>
      </HeadingBarMiddleSection>
    </HeadingBarContainer>
  );
};

export default HeadingBar;
