/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import styled from 'styled-components';

interface ContainerProps {
  margin?: string;
}

const Container = styled.div<ContainerProps>`
  width: 100%;
  margin: ${({margin}) => margin || '0'};
  display: flex;
  gap: 6px;
`;

interface StepProps {
  isFilled: boolean;
}

const Step = styled.div<StepProps>`
  height: 6px;
  border-radius: 3px;
  background: ${({isFilled}) => isFilled ? '#3C7D44' : '#bbb'};
  flex-grow: 1;

`;

export {
  Container,
  Step,
};
