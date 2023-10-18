// styled.js

import styled from 'styled-components';

const OrganizationSummaryWrapper = styled.div`
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
  font-size: 14px;
  margin: 0 0 5px 0;
  font-weight: 600;
`;

const OrganizationParagraph = styled.p`
  font-size: 18px;
  margin: 0 0 20px 0;
`;

export {
  OrganizationSummaryWrapper,
  Heading,
  OrganizationParagraph,
};
