/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';

const Container = styled.div`
  margin: 30px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Note = styled.p`
  margin: 0 0 10px 0;
  font-size: 13px;
  text-align: center;
`;

const BoldText = styled.span`
  font-weight: 500;
`;

const ProgressInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export {
  Container,
  Note,
  BoldText,
  ProgressInfoContainer,
};
