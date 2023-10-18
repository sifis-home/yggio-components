import React from 'react';
import _ from 'lodash';
import {MdCheck as CheckIcon} from 'react-icons/md';

import {ParametersState} from '../types';
import {Chip} from './styled';
import {
  WizardStepContainer,
  WizardHeader,
  WizardContent,
  WizardFooter,
} from '../../../components/wizard';

interface SelectParametersStepProps {
  stepForward: () => void;
  stepBack: () => void;
  parametersState: ParametersState;
}

const SelectParametersStep = (props: SelectParametersStepProps) => {
  return (
    <WizardStepContainer>
      <WizardHeader
        heading='Select what you want to edit'
      />
      <WizardContent>
        <Chip
          onClick={() => props.parametersState.toggleParameter('name')}
          checked={props.parametersState.parameters.name}
        >
          {props.parametersState.parameters.name && (
            <CheckIcon />
          )}
          <p>Name</p>
        </Chip>
        <Chip
          onClick={() => props.parametersState.toggleParameter('description')}
          checked={props.parametersState.parameters.description}
        >
          {props.parametersState.parameters.description && (
            <CheckIcon />
          )}
          <p>Description</p>
        </Chip>
        <Chip
          onClick={() => props.parametersState.toggleParameter('location')}
          checked={props.parametersState.parameters.location}
        >
          {props.parametersState.parameters.location && (
            <CheckIcon />
          )}
          <p>Location</p>
        </Chip>
        <Chip
          onClick={() => props.parametersState.toggleParameter('realEstateCore')}
          checked={props.parametersState.parameters.realEstateCore}
        >
          {props.parametersState.parameters.realEstateCore && (
            <CheckIcon />
          )}
          <p>Real Estate Core</p>
        </Chip>
        <Chip
          onClick={() => props.parametersState.toggleParameter('contextualParameters')}
          checked={props.parametersState.parameters.contextualParameters}
        >
          {props.parametersState.parameters.contextualParameters && (
            <CheckIcon />
          )}
          <p>Contextual Parameters</p>
        </Chip>
      </WizardContent>
      <WizardFooter
        onContinue={props.stepForward}
        disableContinueButton={!_.some(props.parametersState.parameters)}
        onBack={props.stepBack}
      />
    </WizardStepContainer>
  );
};

export default SelectParametersStep;
