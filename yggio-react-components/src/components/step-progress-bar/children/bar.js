/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import {MdCheck as CheckIcon} from 'react-icons/md'; // Checkmark

import {
  BarContainer,
  BarStyled,
  BarFilling,
  IntermediateStepMark,
  FirstStepMark,
  LastStepMark,
} from '../styled';

const Bar = (
  {
    intermediateSteps,
    stepDistance,
    currentStep,
    finished,
  }
) => {

  const barFillingWidth = (100 / (intermediateSteps.length + 1)) * (currentStep - 1);

  const stepMark = i => (
    <IntermediateStepMark
      position={stepDistance * (i + 1)}
      reached={i <= currentStep - 2}
      key={i}
    >
      {i <= currentStep - 3 && <CheckIcon size={16} />}
    </IntermediateStepMark>
  );

  const renderIntermediateStepMarks = _.times(intermediateSteps.length, stepMark);

  return (
    <BarContainer>
      <BarStyled>
        <BarFilling width={barFillingWidth} />
      </BarStyled>
      <FirstStepMark>
        {currentStep > 1 && <CheckIcon size={16} />}
      </FirstStepMark>
      {renderIntermediateStepMarks}
      <LastStepMark reached={currentStep === intermediateSteps.length + 2}>
        {finished && <CheckIcon size={16} />}
      </LastStepMark>
    </BarContainer>
  );
};

export default Bar;
