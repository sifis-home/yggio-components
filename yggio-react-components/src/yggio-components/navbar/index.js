/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'lodash/fp';
import {useIsFetching} from '@tanstack/react-query';

import state from './state';
import {withState} from '../../hocs';
import {CONNECTIVITY_STATES} from './constants';

import {
  Bar,
  ContentWrapper,
  Section,
} from './styled';

import Logo from './sub-components/logo';
import HorizontalMenu from './sub-components/horizontal-menu';
import VerticalMenu from './sub-components/vertical-menu';
import MenuButton from './sub-components/menu-button';
import ConnectWidget from './sub-components/connect-widget';
import LanguageWidget from './sub-components/language-widget';
import UserWidget from './sub-components/user-widget';
import DocsWidget from './sub-components/docs-widget';
import Spinner from '../../components/spinner';
import {COLORS} from '../../constants';

const BasicNavBar = props => {
  const isFetching = useIsFetching();
  return (
    <Bar>
      <ContentWrapper
        centered={props.centered}
        contentWidth={props.contentWidth}
      >
        <Section>
          <Logo
            router={props.router}
            history={props.history}
            title={props.title}
            username={_.get(props, 'user.username')}
          />

          <div style={{width: '30px'}}>
            {!!isFetching && (
              <Spinner color={COLORS.greyLight} size={22} margin={'0 10px 0 0'} />
            )}
          </div>
          <HorizontalMenu
            router={props.router}
            links={props.links}
            activeLink={props.activeLink}
          />
        </Section>
        <Section>
          {!!_.size(props.links) &&
            <MenuButton
              isShowingMenuDropdown={props.isShowingMenuDropdown}
              showMenuDropdown={props.showMenuDropdown}
              closeAllDropdowns={props.closeAllDropdowns}
            />}
          {!!props.isShowingMenuDropdown && (
            <VerticalMenu
              router={props.router}
              links={props.links}
              activeLink={props.activeLink}
            />
          )}
          {(props.connectivityState === CONNECTIVITY_STATES.online ||
              props.connectivityState === CONNECTIVITY_STATES.offline) &&
                <ConnectWidget
                  connectivityState={props.connectivityState}
                  isShowingConnectivityDropdown={props.isShowingConnectivityDropdown}
                  showConnectivityDropdown={props.showConnectivityDropdown}
                  closeAllDropdowns={props.closeAllDropdowns}
                  t={props.t}
                />}
          <DocsWidget
            isShowingDocsDropdown={props.isShowingDocsDropdown}
            showDocsDropdown={props.showDocsDropdown}
            closeAllDropdowns={props.closeAllDropdowns}
            t={props.t}
          />
          <LanguageWidget
            updateUser={props.updateUser}
            user={props.user}
            isShowingLanguageDropdown={props.isShowingLanguageDropdown}
            showLanguageDropdown={props.showLanguageDropdown}
            closeAllDropdowns={props.closeAllDropdowns}
            t={props.t}
            changeLanguage={props.changeLanguage}
            currentLanguage={props.currentLanguage}
          />
          <UserWidget
            username={_.get(props, 'user.username')}
            isShowingUserDropdown={props.isShowingUserDropdown}
            showUserDropdown={props.showUserDropdown}
            closeAllDropdowns={props.closeAllDropdowns}
            signOut={props.signOut}
            t={props.t}
          />
        </Section>
      </ContentWrapper>
    </Bar>
  );
};

BasicNavBar.propTypes = {
  // from top
  title: PropTypes.string,
  links: PropTypes.array,
  activeLink: PropTypes.string,
  user: PropTypes.object,
  connectivityState: PropTypes.string,
  centered: PropTypes.bool,
  contentWidth: PropTypes.number,
  signOut: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  // from router
  history: PropTypes.object,
  // from state
  isShowingMenuDropdown: PropTypes.bool,
  isShowingLanguageDropdown: PropTypes.bool,
  isShowingUserDropdown: PropTypes.bool,
  isShowingDocsDropdown: PropTypes.bool,
  isShowingConnectivityDropdown: PropTypes.bool,
  showMenuDropdown: PropTypes.func,
  showLanguageDropdown: PropTypes.func,
  showUserDropdown: PropTypes.func,
  showDocsDropdown: PropTypes.func,
  showConnectivityDropdown: PropTypes.func,
  closeAllDropdowns: PropTypes.func,
};

const NavBar = compose(
  withState(state),
)(BasicNavBar);

NavBar.propTypes = {
  title: PropTypes.string,
  links: PropTypes.array,
  activeLink: PropTypes.string,
  user: PropTypes.object,
  connectivityState: PropTypes.string,
  centered: PropTypes.bool,
  contentWidth: PropTypes.number,
  signOut: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
};

export default NavBar;
