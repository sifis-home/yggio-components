/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import React from 'react';

import {
  Container,
  Step,
} from './styled';

interface StepProgressBarMiniProps {
  numSteps: number;
  currentStep: number;
  margin?: string;
}

const StepProgressBarMini = (props: StepProgressBarMiniProps) => {
  return (
    <Container margin={props.margin}>
      {_.times(props.numSteps, index => (
        <Step isFilled={index < props.currentStep} key={index} />
      ))}
    </Container>
  );
};

export default StepProgressBarMini;
