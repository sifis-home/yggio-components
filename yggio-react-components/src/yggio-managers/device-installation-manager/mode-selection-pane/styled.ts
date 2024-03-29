﻿/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import styled from 'styled-components';

const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0 20px 0;
  h1 {
    font-size: 17px;
    font-weight: 400;
    margin: 0;
  }
  @media (min-width:500px)  {
    flex-direction: row;
    margin-bottom: 50px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin: 50px 0 10px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width:500px)  {
    flex-direction: row;
    margin-bottom: 50px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
  margin: 0 0 30px 0;
  p {
    color: #555;
    font-size: 13px;
    margin: 8px 0 0 0;
  }
  @media (min-width:500px)  {
    margin: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  margin: 40px 0 0 0;
  width: 800px;
`;

export {
  HeadingContainer,
  ButtonsContainer,
  ButtonContainer,
  Wrapper,
  Container,
};
