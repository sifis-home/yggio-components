import styled from 'styled-components';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  font-size: 13px;
`;

const SuccessMessage = styled.p`
  color: #333;
  font-size: 15px;
  font-weight: 500;
  margin: 10px 0 0 0;
`;

export {
  ContentContainer,
  SuccessMessage,
};
