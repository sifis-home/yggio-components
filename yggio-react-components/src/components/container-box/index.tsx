import React from 'react';

import {ContainerBoxStyled} from './styled';
import ContainerBoxProps from './types';

const ContainerBox = (props: ContainerBoxProps) => {
  return (
    <ContainerBoxStyled
      {...props}
    >
      {props.children}
    </ContainerBoxStyled>
  );
};

export default ContainerBox;
