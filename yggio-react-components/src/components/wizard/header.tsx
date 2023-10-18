import React from 'react';

import {HeaderContainer, Heading, SubHeading} from './styled';

interface HeaderProps {
  heading: string;
  subHeading?: string;
}

const Header = (props: HeaderProps) => {
  return (
    <HeaderContainer>
      <Heading>{props.heading}</Heading>
      {props.subHeading && (
        <SubHeading>{props.subHeading}</SubHeading>
      )}
    </HeaderContainer>
  );
};

export default Header;
