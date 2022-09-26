/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// customizations.js

import Link from './funky-link';

const VerticalMenuLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 14px;
  padding: 0 0 0 20px;
`;

const HorizontalMenuLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  height: 32px;
  font-size: 14px;
  padding: 0 15px;
`;

export {
  VerticalMenuLink,
  HorizontalMenuLink,
};
