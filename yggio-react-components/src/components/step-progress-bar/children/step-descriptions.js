import React from 'react';
import _ from 'lodash';

import {
  IntermediateStepDescriptionStyled,
  DescriptionsContainer,
  FirstStepDescription,
  LastStepDescription,
} from '../styled';

const StepDescriptions = (
  {
    steps,
    intermediateSteps,
    stepDistance,
    currentStep,
    finished,
  }
) => {

  const intermediateStepDescription = (description, i) => (
    <IntermediateStepDescriptionStyled
      position={stepDistance * (i + 1)}
      key={i}
      current={currentStep === i + 2}
    >
      {description}
    </IntermediateStepDescriptionStyled>
  );

  const IntermediateStepDescriptions = _.map(intermediateSteps, intermediateStepDescription);

  return (
    <DescriptionsContainer>
      <FirstStepDescription
        current={currentStep === 1}
      >
        {steps[0]}
      </FirstStepDescription>
      {IntermediateStepDescriptions}
      <LastStepDescription
        current={currentStep === steps.length && !finished}
      >
        {steps[steps.length - 1]}
      </LastStepDescription>
    </DescriptionsContainer>
  );

};

export default StepDescriptions;
