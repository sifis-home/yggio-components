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
import {plug as connectIcon} from 'react-icons-kit/ikons/plug';

import {CONNECTIVITY_STATES, COLORS} from '../constants';
import {
  NavButtonWithDropdown,
  NavButton,
  Dropdown,
  DropdownHeading,
  DropdownParagraph,
} from '../styled';

const ConnectWidget = props => {
  const isOnline = props.connectivityState === CONNECTIVITY_STATES.online;
  return (
    <NavButtonWithDropdown>
      <NavButton
        color={isOnline ? COLORS.yellow : COLORS.red}
        onClick={() => (
          props.isShowingConnectivityDropdown
            ? props.closeAllDropdowns()
            : props.showConnectivityDropdown()
        )}
      >
        <Icon icon={connectIcon} size={16} />
      </NavButton>
      {props.isShowingConnectivityDropdown &&
        <Dropdown>
          <DropdownHeading>
            {isOnline
              ? _.capitalize(props.t('titles.connectionOnline'))
              : _.capitalize(props.t('titles.connectionOffline'))}
          </DropdownHeading>
          <DropdownParagraph>
            {isOnline
              ? props.t('phrases.connectionOnline')
              : props.t('phrases.connectionOffline')}
          </DropdownParagraph>
        </Dropdown>}
      data-cy='profile-button'
    </NavButtonWithDropdown>
  );
};

export default ConnectWidget;
