/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useState} from 'react';
import _ from 'lodash';
import {NextRouter} from 'next/router';
import {useMutation} from '@tanstack/react-query';

import {jobRequests} from '../../../api';
import {STEP_NOT_FOUND} from '../constants';
import {STEPS} from './constants';
import {useLocalState} from '../../../hooks';
import navigationState from '../state';

import StepProgressBar from '../../../components/step-progress-bar';
import UploadFilePane from './upload-file-pane';
import StartInstallationPane from './start-installation-pane';
import InstallationPane from './installation-pane';
import {CenteredPage} from '../../../global/components';

const steps = _.values(STEPS);

interface Props {
  router: NextRouter;
}

const BatchModeRoute = (props: Props) => {

  const navigation = useLocalState(navigationState);

  const batchCreateDevicesMutation = useMutation(
    async (data: Record<string, string>[]) => jobRequests.createDevicesJob(data),
    {
      onSuccess: () => {
        navigation.incrementCurrentStep();
      },
    }
  );

  const [uploadItems, setUploadItems] = useState<Record<string, string>[] | undefined>();

  return (
    <CenteredPage>
      <StepProgressBar
        title={'Install devices'}
        steps={_.map(steps, 'progressBarTitle')}
        currentStep={navigation.currentStep + 1}
        margin={'0 0 9px 0'}
      />
      {{
        [STEPS.uploadFile.name]: (
          <UploadFilePane
            router={props.router}
            goToNextStep={navigation.incrementCurrentStep}
            uploadItems={uploadItems}
            setUploadItems={setUploadItems}
          />
        ),
        [STEPS.startInstallation.name]: (
          <StartInstallationPane
            batchCreateDevicesMutation={batchCreateDevicesMutation}
            uploadItems={uploadItems!}
            goToPreviousStep={navigation.decrementCurrentStep}
          />
        ),
        [STEPS.result.name]: (
          <InstallationPane
            jobId={batchCreateDevicesMutation.data?._id}
            uploadItems={uploadItems!}
            router={props.router}
          />
        ),
        [STEP_NOT_FOUND]: (
          <h1>{'No batch step found'}</h1>
        ),
      }[steps[navigation.currentStep].name || STEP_NOT_FOUND]}
    </CenteredPage>
  );
};

export default BatchModeRoute;
