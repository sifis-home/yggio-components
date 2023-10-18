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
