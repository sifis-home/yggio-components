/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {Icon} from 'react-icons-kit';
import {checkmark as checkIcon} from 'react-icons-kit/ionicons/checkmark';

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
            <Icon icon={checkIcon as object} />
          )}
          <p>Name</p>
        </Chip>
        <Chip
          onClick={() => props.parametersState.toggleParameter('description')}
          checked={props.parametersState.parameters.description}
        >
          {props.parametersState.parameters.description && (
            <Icon icon={checkIcon as object} />
          )}
          <p>Description</p>
        </Chip>
        <Chip
          onClick={() => props.parametersState.toggleParameter('location')}
          checked={props.parametersState.parameters.location}
        >
          {props.parametersState.parameters.location && (
            <Icon icon={checkIcon as object} />
          )}
          <p>Location</p>
        </Chip>
        <Chip
          onClick={() => props.parametersState.toggleParameter('realEstateCore')}
          checked={props.parametersState.parameters.realEstateCore}
        >
          {props.parametersState.parameters.realEstateCore && (
            <Icon icon={checkIcon as object} />
          )}
          <p>Real Estate Core</p>
        </Chip>
        <Chip
          onClick={() => props.parametersState.toggleParameter('contextualParameters')}
          checked={props.parametersState.parameters.contextualParameters}
        >
          {props.parametersState.parameters.contextualParameters && (
            <Icon icon={checkIcon as object} />
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
