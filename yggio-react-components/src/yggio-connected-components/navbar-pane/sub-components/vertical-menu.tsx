/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import React from 'react';
import {NextRouter} from 'next/router';

import {LINKS} from '../constants';
import {VerticalMenuStyled, VerticalLinkButton} from '../styled';

interface VerticalMenuProps {
  activeLink: string;
  router: NextRouter;
}

const VerticalMenu = (props: VerticalMenuProps) => (
  <VerticalMenuStyled>
    {_.map(LINKS, link => (
      <VerticalLinkButton
        data-cy={`vertical-buttons-${link.name}`}
        key={link.name}
        onClick={async () => props.router.push(link.url)}
        active={link.url === props.activeLink}
      >
        {_.capitalize(link.name)}
      </VerticalLinkButton>
    ))}
  </VerticalMenuStyled>
);

export default VerticalMenu;
