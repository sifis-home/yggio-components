/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {useQueryClient} from '@tanstack/react-query';
import {NextRouter} from 'next/router';
import {IdKeyedDevices} from '../../../../types';
import {CenteredPage} from '../../../../global/components';
import StepProgressBar from '../../../../components/step-progress-bar';
import Button from '../../../../components/button';
import {useLocalState} from '../../../../hooks';
import {navigationState} from './state';
import ContainerBox from '../../../../components/container-box';
import {DeletionButtonContainer, TextSpan, ConfirmationContainer} from './styled';
import {jobApi} from '../../../../api';
import {FlexColWrapper} from '../../../../global/styled';
import ProgressBar from '../../../../components/progress-bar';
import InfoBox from '../../../../components/info-box';
import {STEPS, STEPS_NAMES} from './constants';

interface DeletionProps {
  selectedDevices: string[];
  devices: IdKeyedDevices;
  router: NextRouter;
  setSelectedDevices(devices: string[]): void;
  setSelectMode(selectMode: boolean): void;
  setPage(page: string): void;
  t(key: string): string;
}

const Deletion = (props: DeletionProps) => {
  const [jobId, setJobId] = React.useState('');
  const queryClient = useQueryClient();

  const deviceRemovalJobmutation = jobApi.useRemoveDevicesJob(queryClient);

  const navState = useLocalState(navigationState);

  const jobQuery = jobApi.useJob(jobId);

  const sendRemoveDevicesJob = async () => {
    const result = await deviceRemovalJobmutation.mutateAsync(props.selectedDevices);
    setJobId(result._id);
  };

  return (
    <CenteredPage>
      <StepProgressBar
        title={'Device removal'}
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
                <InfoBox
                  type={'error'}
                  heading={'This action will permanently remove all selected devices.'}
                />
                <p>
                  Press continue if you are sure you want to remove&nbsp;
                  <b>{_.size(props.selectedDevices)}</b>&nbsp;devices.
                </p>
              </ConfirmationContainer>
              <DeletionButtonContainer>
                <Button
                  content={_.capitalize(props.t('labels.cancel'))}
                  ghosted
                  onClick={() => {
                    props.setSelectMode(false);
                    props.setSelectedDevices([]);
                    props.setPage('default');
                  }}
                />
                <Button
                  color={'green'}
                  content={_.capitalize(props.t('labels.continue'))}
                  onClick={() => {
                    void sendRemoveDevicesJob();
                    navState.incrementCurrentStep();
                  }}
                />
              </DeletionButtonContainer>
            </>
          ),
          [STEPS_NAMES.summary]: (
            <>
              {
                !jobQuery?.data?.isFinished
                  ? <b>Removing devices..</b>
                  : <b>Finished!</b>
              }
              <FlexColWrapper>
                <p>
                  <b>{jobQuery?.data?.numItemsDone}</b>
                  &nbsp;of {jobQuery?.data?.numItems} devices removed
                </p>
                <TextSpan>{jobQuery?.data?.numSuccesses} succeeded</TextSpan>
                <TextSpan>{jobQuery?.data?.numFailures} failures</TextSpan>
              </FlexColWrapper>
              <ProgressBar
                progress={jobQuery?.data?.progressPercentage}
                margin={'50px 0 0 0'}
              />
              {!jobQuery?.data?.isFinished && (
                <p>
                  Estimated time left:&nbsp;
                  <b>
                    {
                      !_.isNil(jobQuery?.data?.expectedTimeLeftText)
                        ? jobQuery?.data?.expectedTimeLeftText
                        : 'Calculating..'
                    }
                  </b>
                </p>
              )}
              <DeletionButtonContainer>
                <Button
                  disabled={!jobQuery?.data?.isFinished}
                  content={_.capitalize(props.t('labels.back'))}
                  ghosted
                  onClick={navState.decrementCurrentStep}
                />
                <Button
                  disabled={!jobQuery?.data?.isFinished}
                  color={'green'}
                  content={_.capitalize(props.t('labels.finish'))}
                  onClick={async () => {
                    await queryClient.invalidateQueries(['devices']);
                    setJobId('');
                    props.setSelectMode(false);
                    props.setSelectedDevices([]);
                    props.setPage('default');
                  }}
                />
              </DeletionButtonContainer>
            </>
          ),
        }[STEPS[navState.currentStep].name || 'STEP_NOT_FOUND']}
      </ContainerBox>
    </CenteredPage>
  );
};

export default Deletion;
