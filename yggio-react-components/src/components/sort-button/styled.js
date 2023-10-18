import styled from 'styled-components';

const Container = styled.div`
  width: 20px;
  height: 20px;
  margin: ${({margin}) => margin || '0'};
  display: flexbox;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: #f5f5f5;
  }
`;

const Icon = styled.img`
  display: block;
  height: 12px;

`;

export {
  Container,
  Icon,
};
