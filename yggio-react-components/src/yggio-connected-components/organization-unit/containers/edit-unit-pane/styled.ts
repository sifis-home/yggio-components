// styled.js

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  Wrapper,
  ButtonsContainer,
};
