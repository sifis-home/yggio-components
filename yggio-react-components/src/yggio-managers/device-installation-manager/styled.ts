/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';

const Heading = styled.h2`
  font-size: 15px;
  font-weight: 500;
  color: #333;
  margin: 0;
`;

const SubHeading = styled.h3`
  font-size: 13px;
  font-weight: normal;
  color: #666;
  margin: 5px 0 0 0;
`;

const ContentContainer = styled.div<{
  padding?: string
}>`
  min-height: 200px;
  padding: ${({padding}) => padding || '40px 0 35px 0'};
  font-size: 13px;
`;

const NavButtonsContainer = styled.div<{
  flexDirection?: string
}>`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: ${props => props.flexDirection || 'row'};
`;

const Link = styled.p`
  color: #125AC7;
  text-decoration: underline;
  margin: 0;
  cursor: pointer;
`;

const CsvLinkWrapper = styled.div`
  a {
    color: #125AC7;
    text-decoration: underline;
    margin: 0;
    cursor: pointer;
  }
`;

export {
  Heading,
  SubHeading,
  ContentContainer,
  NavButtonsContainer,
  Link,
  CsvLinkWrapper,
};
