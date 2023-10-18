/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PageContainer = styled.div`
  margin: 10px 10px 0 10px;
  width: ${({maxWidth}) => maxWidth || '800px'};
`;

const CenteredPage = props => (
  <PageWrapper>
    <PageContainer maxWidth={props.maxWidth}>
      {props.children}
    </PageContainer>
  </PageWrapper>
);

const HeadingContainer = styled.div`
  margin:${({margin}) => margin || '0'};
`;

const HeadingTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  color: #222;
`;

const SubHeading = styled.p`
  font-size: 13px;
  margin: 3px 0 0 0;
  color: #444;
`;

const Heading = props => (
  <HeadingContainer margin={props.margin}>
    <HeadingTitle>{props.heading}</HeadingTitle>
    {props.subHeading && (
      <SubHeading>{props.subHeading}</SubHeading>
    )}
  </HeadingContainer>
);

export {
  CenteredPage,
  Heading,
};
