import styled from 'styled-components';

const Heading = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin: 0;
  font-weight: bold;
`;

const ResultSubHeading = styled.p`
  font-size: 13px;
  margin: 4px 0 20px 0;
`;

const ProgressInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 20px 0;
  p {
    margin: 5px 0 0 0;
    font-size: 13px;
  }
`;

const Paragraph = styled.div`
  font-size: 13px;
`;

const Section = styled.div`
  margin: 0 0 30px 0;
`;

const NumItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 7px 0;
  p {
    margin: 0 0 0 8px;
    font-size: 14px;
    font-weight: bold;
  }
`;

const TopError = styled.p`
  margin: 5px 0;
  font-size: 13px;
`;

const CsvLinkWrapper = styled.div`
  a {
    color: #125AC7;
    text-decoration: underline;
    margin: 0;
    cursor: pointer;
    font-size: 13px;
  }
`;


export {
  Heading,
  ResultSubHeading,
  Paragraph,
  ProgressInfoContainer,
  Section,
  NumItem,
  TopError,
  CsvLinkWrapper,
};
