// styled.js

import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 10px;
  h1 {
    font-size: 20px;
    margin: 0 0 10px 0;
  }
  h2 {
    font-size: 16px;
    margin: 0px;
  }
`;

const Heading = styled.p`
  font-size: 13px;
  margin: 0 0 5px 0;
  font-weight: 600;
`;

const UnitName = styled.p`
  font-size: 16px;
  margin: 0 0 20px 0;
`;

const UnitDescription = styled.p`
  font-size: 16px;
  margin: 0 0 20px 0;
`;

const NoUnitDescription = styled.p`
  font-size: 14px;
  margin: 0 0 20px 0;
  color: gray;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

export {
  Wrapper,
  Heading,
  UnitName,
  UnitDescription,
  NoUnitDescription,
  ButtonsContainer,
};
