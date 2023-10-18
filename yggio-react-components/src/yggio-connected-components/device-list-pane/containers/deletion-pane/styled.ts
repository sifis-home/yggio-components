import styled from 'styled-components';
import {FlexMaxWidthSpaceBetweenWrapper} from '../../../../global/styled';

const DeletionButtonContainer = styled(FlexMaxWidthSpaceBetweenWrapper)`
  height: 100px;
  align-items: flex-end;
`;

const ConfirmationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 30px 0 0 0;
`;

export {
  DeletionButtonContainer,
  ConfirmationContainer,
};
