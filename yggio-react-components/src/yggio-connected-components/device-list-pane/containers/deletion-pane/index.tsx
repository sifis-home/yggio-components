/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import toast from 'react-hot-toast';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';

// Logic
import {jobTypes} from 'yggio-types';
import {useLocalState} from '../../../../hooks';
import {navigationState} from './state';
import {jobRequests, jobApi} from '../../../../api';
import {STEPS, STEPS_NAMES} from './constants';
import {getRequestErrorMessage} from '../../../../utils';

// UI
import {CenteredPage} from '../../../../global/components';
import StepProgressBar from '../../../../components/step-progress-bar';
import Button from '../../../../components/button';
import ContainerBox from '../../../../components/container-box';
import BatchOperationView from '../../../batch-operation-view';
import {DeletionButtonContainer, ConfirmationContainer} from './styled';
import InfoBox from '../../../../components/info-box';

interface DeletionProps {
  selectedDevices: string[];
  setSelectedDevices(devices: string[]): void;
  setIsInSelectMode(selectMode: boolean): void;
  setPage(page: string): void;
  resetListState(): void;
}

const Deletion = (props: DeletionProps) => {
  const {t} = useTranslation();

  const navState = useLocalState(navigationState);

  const [jobId, setJobId] = React.useState('');

  const queryClient = useQueryClient();

  const removeDevicesJobMutation = useMutation(
    async (deviceIds: string[]) => jobRequests.removeDevicesJob(deviceIds),
    {
      onSuccess: async (job: jobTypes.Job) => {
        await queryClient.invalidateQueries(['job']);
        setJobId(job._id);
      },
      onError: (err: Error) => {
        toast.error(getRequestErrorMessage(err));
      },
    }
  );

  const jobQuery = jobApi.useJob(jobId);

  const onDoneClick = async () => {
    await queryClient.invalidateQueries(['devices']);
    props.resetListState();
    setJobId('');
    props.setIsInSelectMode(false);
    props.setSelectedDevices([]);
    props.setPage('default');
  };

  return (
    <CenteredPage>
      <StepProgressBar
        title={'Remove many devices'}
        steps={_.map(STEPS, 'progressBarTitle')}
        currentStep={navState.currentStep + 1}
        margin={'0 0 9px 0'}
        width={'100%'}
      />
      <ContainerBox>
        {{
          [STEPS_NAMES.confirmation]: (
            <>
              <ConfirmationContainer>
                <p>
                  Press continue if you are sure you want to remove the <b>{_.size(props.selectedDevices)}</b> devices
                </p>
                <InfoBox
                  type={'error'}
                  heading={'This action will permanently delete the selected devices'}
                  margin={'20px 0 0 0'}
                />
              </ConfirmationContainer>
              <DeletionButtonContainer>
                <Button
                  content={_.capitalize(t('labels.cancel'))}
                  ghosted
                  onClick={() => props.setPage('default')}
                />
                <Button
                  color={'green'}
                  content={_.capitalize(t('labels.continue'))}
                  onClick={() => {
                    removeDevicesJobMutation.mutate(props.selectedDevices);
                    navState.incrementCurrentStep();
                  }}
                />
              </DeletionButtonContainer>
            </>
          ),
          [STEPS_NAMES.summary]: (
            <BatchOperationView
              job={jobQuery.data}
              items={_.map(props.selectedDevices, device => ({_id: device}))}
              onDoneClick={onDoneClick}
              progressHeading='Deleting devices...'
              successesText='devices was successfully deleted'
              errorsText='devices failed to get deleted'
            />
          ),
        }[STEPS[navState.currentStep].name || 'STEP_NOT_FOUND']}
      </ContainerBox>
    </CenteredPage>
  );
};

export default Deletion;
