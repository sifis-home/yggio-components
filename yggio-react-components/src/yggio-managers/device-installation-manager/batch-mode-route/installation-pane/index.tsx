/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React, {useEffect} from 'react';
import _ from 'lodash';

import {devicesApi, jobApi} from '../../../../api';
import {StyledContainerBox} from '../../sub-components';
import {Job} from '../../../../types';
import Button from '../../../../components/button';
import InfoBox from '../../../../components/info-box';
import ProgressBar from '../../../../components/progress-bar';
import {
  Container,
  Note,
  BoldText,
  ProgressInfoContainer,
} from './styled';
import {
  ContentContainer,
  Heading,
  NavButtonsContainer,
} from '../../styled';

interface Props {
  uploadItems: Record<string, string>[];
  goToPreviousStep: () => void;
  goToNextStep: () => void;
  setResult: (job: Job) => void;
}

const InstallationPane = (props: Props) => {

  const batchCreateDevicesMutation = devicesApi.useBatchCreateDevices();

  const jobId = batchCreateDevicesMutation.data?._id;

  const jobsQuery = jobApi.useJob(jobId);

  useEffect(() => {
    if (jobsQuery.data?.isFinished) {
      props.setResult(jobsQuery.data);
      props.goToNextStep();
    }
  }, [jobsQuery.data]);

  return (
    <StyledContainerBox>
      {!jobsQuery.data && (
        <>
          <ContentContainer>
            <Container>
              <Note>
                <BoldText>{props.uploadItems.length} devices</BoldText> will be installed.
              </Note>
              <Note>Note that you cannot stop the installation once it has started.</Note>
              <Button
                color={'green'}
                label={'Start installation'}
                onClick={() => batchCreateDevicesMutation.mutate(props.uploadItems)}
                isLoading={batchCreateDevicesMutation.isLoading}
                disabled={batchCreateDevicesMutation.isLoading}
                width={'180px'}
                margin={'20px 0 0 0'}
              />
              {batchCreateDevicesMutation.isError && (
                <InfoBox
                  type={'error'}
                  heading={'Error: Could not start installation'}
                  content={'TODO: get error from response'}
                  margin={'30px 0 0 0'}
                />
              )}
            </Container>
          </ContentContainer>
          <NavButtonsContainer>
            <Button
              content={'Back'}
              ghosted
              onClick={props.goToPreviousStep}
            />
          </NavButtonsContainer>
        </>
      )}
      {jobsQuery.data && (
        <>
          <Heading>Installing devices...</Heading>
          <ContentContainer>
            <ProgressBar
              progress={jobsQuery.data.progressPercentage}
              margin={'50px 0 0 0'}
            />
            <ProgressInfoContainer>
              <p>
                <BoldText>
                  {jobsQuery.data.numItemsDone}
                </BoldText> of {jobsQuery.data.numItems} devices done
              </p>
              {!_.isNil(jobsQuery.data.expectedTimeLeftText) && (
                <p>
                  Estimated time left: <BoldText>{jobsQuery.data.expectedTimeLeftText}</BoldText>
                </p>
              )}
            </ProgressInfoContainer>
          </ContentContainer>
        </>
      )}
    </StyledContainerBox>
  );
};

export default InstallationPane;
