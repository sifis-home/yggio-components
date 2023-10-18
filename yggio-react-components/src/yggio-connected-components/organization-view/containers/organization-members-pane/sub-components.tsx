/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';

import {
  MemberItemWrapper,
} from './styled';

interface MemberItemProps {
  index: number;
  member: {
    username: string;
  };
}

const MemberItem = (props: MemberItemProps) => (
  <MemberItemWrapper>
    <p>{`${props.index + 1}.  ${props.member.username}`}</p>
  </MemberItemWrapper>
);

export {
  MemberItem,
};
