/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useState} from 'react';
import _ from 'lodash';
import {useQuery} from '@tanstack/react-query';

// Logic
import {useLocalState} from '../../hooks';
import {devicesRequests} from '../../api/devices';
import {
  searchDeviceFormStateOptions,
  parametersStateOptions,
} from './state';
import {Device} from '../../types';
import {getSteps} from './utils';
import {STEPS, PROGRESS_BAR_TITLES} from './constants';

// UI
import {wizardStateOptions, Wizard} from '../../components/wizard';
import SearchDeviceStep from './search-device-step';
import SelectParametersStep from './select-parameters-step';
import FinishedStep from './finished-step';
import NameStep from './name-step';
import DescriptionStep from './description-step';
import LocationStep from './location-step';
import RealEstateCoreStep from './real-estate-core-step';
import ContextualParametersStep from './contextual-parameters-step';

const DeviceUpdater = () => {

  const wizardState = useLocalState(wizardStateOptions);
  const searchDeviceFormState = useLocalState(searchDeviceFormStateOptions);
  const parametersState = useLocalState(parametersStateOptions);

  const [device, setDevice] = useState<Device>();
  const [deviceIsJoined, setDeviceIsJoined] = useState<boolean>();

  const shouldPollDevice = !_.isString(device?.connector) && _.every([device?.connector?.downlinkQueue === 'ChirpStack', !deviceIsJoined, wizardState.currentStep !== 0]);

  const deviceQuery = useQuery(
    ['device', device?._id],
    async () => devicesRequests.fetchOne({deviceId: device!._id}),
    {
      enabled: shouldPollDevice,
      refetchInterval: 10000,
      onSuccess: data => {
        setDeviceIsJoined(!!data.joinAccept);
      }
    }
  );

  const steps = getSteps(parametersState);

  return (
    <Wizard
      progressBarTitle='Device Updater'
      steps={_.map(steps, step => PROGRESS_BAR_TITLES[step])}
      currentStep={wizardState.currentStep + 1}
      deviceIsJoined={deviceIsJoined}
      deviceQueryIsLoading={deviceQuery.isFetching}
    >
      {{
        [STEPS.searchDevice]: (
          <SearchDeviceStep
            stepForward={wizardState.stepForward}
            form={searchDeviceFormState}
            setDevice={setDevice}
            device={device}
            setDeviceIsJoined={setDeviceIsJoined}
          />
        ),
        [STEPS.selectParameters]: (
          <SelectParametersStep
            stepForward={wizardState.stepForward}
            stepBack={wizardState.stepBack}
            parametersState={parametersState}
          />
        ),
        [STEPS.name]: (
          <NameStep
            stepForward={wizardState.stepForward}
            stepBack={wizardState.stepBack}
            device={device!}
          />
        ),
        [STEPS.description]: (
          <DescriptionStep
            stepForward={wizardState.stepForward}
            stepBack={wizardState.stepBack}
            device={device!}
          />
        ),
        [STEPS.location]: (
          <LocationStep
            stepForward={wizardState.stepForward}
            stepBack={wizardState.stepBack}
            device={device!}
          />
        ),
        [STEPS.realEstateCore]: (
          <RealEstateCoreStep
            stepForward={wizardState.stepForward}
            stepBack={wizardState.stepBack}
            device={device!}
          />
        ),
        [STEPS.contextualParameters]: (
          <ContextualParametersStep
            stepForward={wizardState.stepForward}
            stepBack={wizardState.stepBack}
            device={device!}
          />
        ),
        [STEPS.finished]: (
          <FinishedStep
            goToStep={wizardState.goToStep}
            resetStates={() => searchDeviceFormState.resetForm()}
          />
        ),
      }[steps[wizardState.currentStep]]}
    </Wizard>
  );
};

export default DeviceUpdater;
