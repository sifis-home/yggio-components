import styled from 'styled-components';

interface ContainerProps {
  margin?: string;
}

const Container = styled.div<ContainerProps>`
  margin: ${({margin}) => margin};
  animation: spin 1s linear infinite;
  width: fit-content;
  @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`;

export {
  Container,
};
