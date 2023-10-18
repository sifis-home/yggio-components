import React from 'react';

import ContainerBox from '../../components/container-box';

const StyledContainerBox = (props: {children: React.ReactNode}) => (
  <ContainerBox padding={'30px'} margin={'0 0 5% 0'}>
    {props.children}
  </ContainerBox>
);

export {
  StyledContainerBox,
};
