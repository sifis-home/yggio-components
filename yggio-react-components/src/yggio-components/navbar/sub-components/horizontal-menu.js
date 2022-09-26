/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import React from 'react';

import {
  HorizontalMenuStyled,
  HorizontalLinkButton,
} from '../styled';

const HorizontalMenu = props => (
  <HorizontalMenuStyled>
    {_.map(props.links, link => (
      <HorizontalLinkButton
        data-cy={`horizontal-buttons-${link.name}`}
        key={link.name}
        onClick={() => props.router.push(link.url)}
        active={link.url === props.activeLink}
      >
        {_.capitalize(link.name)}
      </HorizontalLinkButton>
    ))}
  </HorizontalMenuStyled>
);

export default HorizontalMenu;
