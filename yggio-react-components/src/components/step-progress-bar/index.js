/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ContainerBox from '../container-box';
import {DEFAULTS} from './constants';
import Bar from './children/bar';
import StepDescriptions from './children/step-descriptions';
import {
  TitleContainer,
  Title,
} from './styled';

const StepProgressBar = props => {

  const intermediateSteps = _.slice(props.steps, 1, props.steps.length - 1);
  const stepDistance = _.floor(100 / (intermediateSteps.length + 1));

  return (
    <ContainerBox
      margin={props.margin || DEFAULTS.margin}
      padding="25px 20px 12px 20px"
      width={props.width}
    >

      <TitleContainer>
        <Title>{props.title}</Title>
      </TitleContainer>

      <Bar
        intermediateSteps={intermediateSteps}
        stepDistance={stepDistance}
        currentStep={props.currentStep}
        finished={props.finished}
      />

      <StepDescriptions
        steps={props.steps}
        intermediateSteps={intermediateSteps}
        stepDistance={stepDistance}
        currentStep={props.currentStep}
        finished={props.finished}
      />
    </ContainerBox>
  );

};

StepProgressBar.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  steps: PropTypes.array.isRequired,
  margin: PropTypes.string,
  width: PropTypes.string,
  currentStep: PropTypes.number.isRequired,
  finished: PropTypes.bool,
};

export default StepProgressBar;
