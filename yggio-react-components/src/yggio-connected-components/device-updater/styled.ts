import styled from 'styled-components';

import ContainerBox from '../../components/container-box';

const StyledContainerBox = styled(ContainerBox)`
  @media (max-width: 500px) {
    height: calc(100vh - 70px);
  }
`;

export {
  StyledContainerBox,
};
