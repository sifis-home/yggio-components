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
import {check as checkIcon} from 'react-icons-kit/entypo/check';

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
      {i <= currentStep - 3 && <Icon icon={checkIcon} size={14} />}
    </IntermediateStepMark>
  );

  const renderIntermediateStepMarks = _.times(intermediateSteps.length, stepMark);

  return (
    <BarContainer>
      <BarStyled>
        <BarFilling width={barFillingWidth} />
      </BarStyled>
      <FirstStepMark>
        {currentStep > 1 && <Icon icon={checkIcon} size={14} />}
      </FirstStepMark>
      {renderIntermediateStepMarks}
      <LastStepMark reached={currentStep === intermediateSteps.length + 2}>
        {finished && <Icon icon={checkIcon} size={14} />}
      </LastStepMark>
    </BarContainer>
  );
};

export default Bar;
