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
  VerticalMenuStyled,
  VerticalLinkButton,
} from '../styled';

const VerticalMenu = props => (
  <VerticalMenuStyled>
    {_.map(props.links, link => (
      <VerticalLinkButton
        data-cy={`vertical-buttons-${link.name}`}
        key={link.name}
        onClick={() => props.router.push(link.url)}
        active={link.url === props.activeLink}
      >
        {_.capitalize(link.name)}
      </VerticalLinkButton>
    ))}
  </VerticalMenuStyled>
);

export default VerticalMenu;
