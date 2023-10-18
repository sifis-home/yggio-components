/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';

import {
  MembersContainer,
} from './styled';
import Button from '../../../../components/button';

interface MemberRowProps {
  member: {_id: string, username: string};
  onSelected(id: string): void;
}

const MemberRow = (props: MemberRowProps) => {

  const onClick = () => {
    props.onSelected(props.member._id);
  };

  return (
    <MembersContainer>
      <p>{props.member.username}</p>
      <Button
        onClick={onClick}
        content={'Add'}
        color="green"
      />
    </MembersContainer>
  );
};

export {
  MemberRow,
};
