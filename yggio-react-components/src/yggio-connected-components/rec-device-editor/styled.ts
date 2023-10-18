import styled from 'styled-components';

const RecHeading = styled.p`
  margin: 0 0 15px 0;
  font-size: 13px;
  font-weight: bold;
  color: #555;
`;

const RecItem = styled.div`
  display: flex;
  margin: 0 0 15px 0;
`;

const RecItemTitle = styled.p`
  margin: 0 8px 0 0;
  font-size: 13px;
  font-weight: bold;
`;

const RecItemText = styled.p`
  margin: 0;
  font-size: 13px;
`;

const ProvisionLoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 13px;
    margin: 0 0 0 7px;
    color: #333;
  }
`;

export {
  RecHeading,
  RecItem,
  RecItemTitle,
  RecItemText,
  ProvisionLoadingWrapper,
};
