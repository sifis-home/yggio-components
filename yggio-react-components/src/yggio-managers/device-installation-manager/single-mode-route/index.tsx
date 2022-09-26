/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {compose} from 'lodash/fp';
import React from 'react';
import {NextRouter} from 'next/router';

import {STEP_NOT_FOUND} from '../constants';
import {STEPS, DEVICE_TYPES, PROGRESS_BAR_TITLES} from './constants';
import {selectSteps} from './selectors';
import {withState} from '../../../hocs';
import {
  navigationState,
  deviceTypeFormState,
  loraFormState,
  genericFormState,
  detailsFormState,
  translatorFormState,
} from './state';
import {Forms} from './types';
import {useUpdateLocationMutation} from './queries';
import {Navigation} from '../types';

import StepProgressBar from '../../../components/step-progress-bar';
import {CenteredPage} from '../../../global/components';

import DeviceTypeSelectionPane from './device-type-selection-pane';
import LoraPane from './lora-pane';
import GenericPane from './generic-pane';
import DetailsPane from './details-pane';
import ResultPane from './result-pane';
import TranslatorPane from './translator-pane';

interface BasicSingleModeStepsProps {
  router: NextRouter;
  navigation: Navigation;
  forms: Forms;
  steps: string[];
}

const BasicSingleModeSteps = (props: BasicSingleModeStepsProps) => {
  const updateLocationMutation = useUpdateLocationMutation(props.navigation.incrementCurrentStep);
  const steps = selectSteps(props.forms.deviceType.formInputs.deviceType.value as DEVICE_TYPES);
  return (
    <CenteredPage>
      <StepProgressBar
        title={'Install device'}
        steps={_.map(steps, step => PROGRESS_BAR_TITLES[step])}
        currentStep={props.navigation.currentStep + 1}
        margin={'0 0 9px 0'}
      />
      {{
        [STEPS.deviceType]: (
          <DeviceTypeSelectionPane
            router={props.router}
            incrementCurrentStep={props.navigation.incrementCurrentStep}
            form={props.forms.deviceType}
          />
        ),
        [STEPS.lora]: (
          <LoraPane
            onBack={() => {
              props.forms.deviceType.resetForm();
              props.forms.lora.resetForm();
              props.navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={props.navigation.incrementCurrentStep}
            form={props.forms.lora}
          />
        ),
        [STEPS.generic]: (
          <GenericPane
            onBack={() => {
              props.forms.deviceType.resetForm();
              props.forms.generic.resetForm();
              props.navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={props.navigation.incrementCurrentStep}
            form={props.forms.generic}
          />
        ),
        [STEPS.translator]: (
          <TranslatorPane
            onBack={() => {
              props.forms.translator.resetForm();
              props.navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={props.navigation.incrementCurrentStep}
            {...props.forms.translator}
          />
        ),
        [STEPS.details]: (
          <DetailsPane
            forms={props.forms}
            onBack={() => {
              props.forms.details.resetForm();
              props.navigation.decrementCurrentStep();
            }}
            incrementCurrentStep={props.navigation.incrementCurrentStep}
            updateLocationMutation={updateLocationMutation}
          />
        ),
        [STEPS.result]: (
          <ResultPane
            router={props.router}
            detailsFormInputs={props.forms.details.formInputs}
            updateLocationMutation={updateLocationMutation}
          />
        ),
        [STEP_NOT_FOUND]: (
          <h1>{'No single step found'}</h1>
        ),
      }[steps[props.navigation.currentStep]]}
    </CenteredPage>
  );
};

const SingleModePane = compose(
  withState(navigationState, 'navigation'),
  withState(deviceTypeFormState, 'forms.deviceType'),
  withState(loraFormState, 'forms.lora'),
  withState(genericFormState, 'forms.generic'),
  withState(translatorFormState, 'forms.translator'),
  withState(detailsFormState, 'forms.details'),
)(BasicSingleModeSteps);

export default SingleModePane;
