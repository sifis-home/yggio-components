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
