/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// funky-link/styled.js

// NOTE: this is not a dumping ground. Only stuff that is needed for
// FunkyLink is used here. These should not be used elsewhere

import styled from 'styled-components';
import {Link, NavLink} from 'react-router-dom';

import {
  COLORS,
} from '../../constants';
import Button from '../button';

// ////
// buttons
// ////

const BasicButton = styled(Button)`
`;

const BasicNavButton = styled(Button)`
`;

// ////
// links
// ////

const generateBasicLink = LinkType => styled(LinkType)`
  color: ${({color}) => color || COLORS.white};
  pointer-events: ${({disabled}) => (disabled ? 'none' : 'auto')};
  text-decoration: none;
  transition: background 0.2s, color 0.2s;

  &:hover {
    transition: background 0.2s, color 0.2s;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const BasicLink = generateBasicLink(Link);
const BasicNavLink = generateBasicLink(NavLink);

// ////
// exports
// ////

export {
  BasicButton,
  BasicNavButton,
  BasicLink,
  BasicNavLink,
};
