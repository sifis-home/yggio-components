import React from 'react';
import {MdCheckCircle as CheckCircleIcon} from 'react-icons/md';

import Button from '../../../components/button';
import {FlexMaxWidthCenterWrapper} from '../../../global/styled';
import {WizardStepContainer, WizardContent} from '../../../components/wizard';
import {Container, SuccessMessage} from './styled';

interface FinishedStepProps {
  goToStep: (step: number) => void;
  resetStates: () => void;
}

const FinishedStep = (props: FinishedStepProps) => {
  return (
    <WizardStepContainer>
      <WizardContent>
        <Container>
          <CheckCircleIcon size={90} />
        </Container>
        <SuccessMessage>Device was successfully updated</SuccessMessage>
        <FlexMaxWidthCenterWrapper>
          <Button
            onClick={() => {
              props.resetStates();
              props.goToStep(0);
            }}
            label={'Update another device'}
            width={'180px'}
            height={'40px'}
            margin={'20px 0 30px 0'}
          />
        </FlexMaxWidthCenterWrapper>
      </WizardContent>
    </WizardStepContainer>
  );
};

export default FinishedStep;
