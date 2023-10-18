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
