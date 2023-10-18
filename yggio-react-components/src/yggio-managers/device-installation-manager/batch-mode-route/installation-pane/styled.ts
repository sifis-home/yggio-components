import styled from 'styled-components';

const Section = styled.div`
  margin: 0 0 30px 0;
`;

const NumItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 7px 0;
  p {
    margin: 0 0 0 8px;
    font-size: 13px;
    font-weight: 500;
  }
`;

const TopError = styled.li`
  margin: 5px 0;
`;

export {
  Section,
  NumItem,
  TopError,
};
