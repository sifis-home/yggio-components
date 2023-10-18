/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';

const HeaderCell = (props: {children: JSX.Element | string}) => (
  <th style={{
    paddingBottom: 3,
    paddingLeft: 7,
    paddingRight: 7,
    fontSize: '13px',
  }}
  >
    {props.children}
  </th>
);

const BodyCell = (props: {children: JSX.Element | string}) => (
  <th style={{
    border: '1px solid #888888',
    paddingTop: 3,
    paddingLeft: 7,
    paddingRight: 7,
    fontSize: '13px',
    fontWeight: 'normal',
  }}
  >
    {props.children}
  </th>
);

export {
  HeaderCell,
  BodyCell,
};
