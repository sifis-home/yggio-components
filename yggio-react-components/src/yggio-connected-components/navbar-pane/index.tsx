/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useState} from 'react';
import _ from 'lodash';
import {useIsFetching} from '@tanstack/react-query';
import {NextRouter} from 'next/router';
import {useTranslation} from 'react-i18next';

import Logo from './sub-components/logo';
import HorizontalMenu from './sub-components/horizontal-menu';
import VerticalMenu from './sub-components/vertical-menu';
import MenuButton from './sub-components/menu-button';
import LanguageWidget from './sub-components/language-widget';
import UserWidget from './sub-components/user-widget';
import DocsWidget from './sub-components/docs-widget';
import AlarmsWidget from './sub-components/alarms-widget';
import Spinner from '../../components/spinner';
import {userApi} from '../../api';
import {DROPDOWN_NAMES} from './constants';
import {COLORS} from '../../constants';
import {
  NavbarParent,
  NavbarSibling,
  Bar,
  ContentWrapper,
  Section,
} from './styled';

import type {DropdownName} from './types';

interface NavbarProps {
  title?: string;
  router: NextRouter;
}

const Navbar = (props: NavbarProps) => {

  const {i18n} = useTranslation();
  document.documentElement.lang = i18n.language;

  const [openedDropdown, setOpenedDropdown] = useState<DropdownName>();

  const userQuery = userApi.useTokenUser();

  const isFetching = useIsFetching();

  const activeLink = `/${_.split(props.router.route, '/')[1]}`;

  return (
    <Bar>
      <ContentWrapper>
        <Section>
          <Logo
            title={props.title}
            router={props.router}
          />
          <div style={{width: '30px'}}>
            {!!isFetching && (
              <Spinner color={COLORS.greyLight} size={16} />
            )}
          </div>
          <HorizontalMenu
            activeLink={activeLink}
            router={props.router}
          />
        </Section>
        <Section>
          <MenuButton
            openedDropdown={openedDropdown}
            setOpenedDropdown={setOpenedDropdown}
          />
          {openedDropdown === DROPDOWN_NAMES.menu && (
            <VerticalMenu
              activeLink={activeLink}
              router={props.router}
            />
          )}
          <AlarmsWidget
            router={props.router}
          />
          <DocsWidget
            openedDropdown={openedDropdown}
            setOpenedDropdown={setOpenedDropdown}
          />
          <LanguageWidget
            user={userQuery.data}
            openedDropdown={openedDropdown}
            setOpenedDropdown={setOpenedDropdown}
          />
          <UserWidget
            username={userQuery.data?.username}
            openedDropdown={openedDropdown}
            setOpenedDropdown={setOpenedDropdown}
          />
        </Section>
      </ContentWrapper>
    </Bar>
  );
};

interface NavbarPaneProps {
  title: string;
  children: React.ReactNode;
  router: NextRouter;
}

const NavbarPane = (props: NavbarPaneProps) => {
  return (
    <NavbarParent>
      <Navbar
        title={props.title}
        router={props.router}
      />
      <NavbarSibling>
        {props.children}
      </NavbarSibling>
    </NavbarParent>
  );
};

export default NavbarPane;
