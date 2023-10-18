import React from 'react';
import {UseMutationResult} from '@tanstack/react-query';

import {jobTypes} from 'yggio-types';
import {StyledContainerBox} from '../../sub-components';
import Button from '../../../../components/button';
import InfoBox from '../../../../components/info-box';
import {
  Container,
  Note,
} from './styled';
import {
  ContentContainer,
  NavButtonsContainer,
} from '../../styled';

interface StartInstallationPaneProps {
  batchCreateDevicesMutation: UseMutationResult<jobTypes.Job, unknown, Record<string, string>[], unknown>;
  uploadItems: Record<string, string>[];
  goToPreviousStep: () => void;
}

const StartInstallationPane = (props: StartInstallationPaneProps) => {
  return (
    <StyledContainerBox>
      <ContentContainer>
        <Container>
          <Note>
            <b>{props.uploadItems.length} devices</b> will be installed.
          </Note>
          <Note>Note that you cannot stop the installation once it has started.</Note>
          <Button
            color={'green'}
            label={'Start installation'}
            onClick={() => props.batchCreateDevicesMutation.mutate(props.uploadItems)}
            isLoading={props.batchCreateDevicesMutation.isLoading}
            disabled={props.batchCreateDevicesMutation.isLoading}
            width={'180px'}
            margin={'20px 0 0 0'}
          />
          {props.batchCreateDevicesMutation.isError && (
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
    </StyledContainerBox>
  );
};

export default StartInstallationPane;
