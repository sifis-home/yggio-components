import React from 'react';
import {Show} from '@chakra-ui/react';
import _ from 'lodash';

import StepProgressBar from '../step-progress-bar';
import StepProgressBarMini from '../step-progress-bar-mini';
import Spinner from '../spinner';
import ContainerBox from '../container-box';
import {CenteredPage} from '../../global/components';
import {JoinStatusContainer, JoinStatusLight} from './styled';

interface WizardProps {
  steps: string[];
  progressBarTitle?: string;
  currentStep: number;
  deviceIsJoined?: boolean;
  deviceQueryIsLoading: boolean;
  children: React.ReactNode;
}

const Wizard = (props: WizardProps) => {
  return (
    <CenteredPage>
      <Show above='501px'>
        <StepProgressBar
          title={props.progressBarTitle}
          steps={props.steps}
          currentStep={props.currentStep}
          margin={'0 0 7px 0'}
        />
        <ContainerBox>
          <JoinStatusSection
            deviceIsJoined={props.deviceIsJoined}
            deviceQueryIsLoading={props.deviceQueryIsLoading}
          />
          {props.children}
        </ContainerBox>
      </Show>


      <Show below='500px'>
        <ContainerBox height={'calc(100vh - 20px)'}>
          <JoinStatusSection
            deviceIsJoined={props.deviceIsJoined}
            deviceQueryIsLoading={props.deviceQueryIsLoading}
            marginBottom={15}
          />
          <StepProgressBarMini
            numSteps={_.size(props.steps)}
            currentStep={props.currentStep}
            margin='0 0 16px 0'
          />
          {props.children}
        </ContainerBox>
      </Show>

    </CenteredPage>
  );
};

interface JoinStatusSectionProps {
  deviceQueryIsLoading: boolean;
  deviceIsJoined?: boolean;
  marginBottom?: number;
}

// TODO: This one don't really belong in the shared wizard component
const JoinStatusSection = (props: JoinStatusSectionProps) => {
  if (props.deviceIsJoined === undefined) {
    return null;
  }
  return (
    <JoinStatusContainer marginBottom={props.marginBottom}>
      {props.deviceQueryIsLoading ? (
        <Spinner size={14} margin={'0 0 0 5px'} />
      ) : (
        <JoinStatusLight deviceIsJoined={props.deviceIsJoined} />
      )}
      <p>{props.deviceIsJoined ? 'Joined' : 'Not yet joined'}</p>
    </JoinStatusContainer>
  );
};

export default Wizard;
