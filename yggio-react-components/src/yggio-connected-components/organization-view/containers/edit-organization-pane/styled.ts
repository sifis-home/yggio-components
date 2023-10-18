// styled.js

import styled from 'styled-components';

const EditOrganizationWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 10px 0 0 0;
  h1 {
    font-size: 18px;
    margin: 0 0 20px 0;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 15px;
`;

export {
  EditOrganizationWrapper,
  ButtonsContainer,
};
