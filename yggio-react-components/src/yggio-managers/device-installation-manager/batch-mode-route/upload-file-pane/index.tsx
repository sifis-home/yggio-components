/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React, {useState} from 'react';
import {NextRouter} from 'next/router';

import Button from '../../../../components/button';
import {StyledContainerBox} from '../../sub-components';

import {
  Heading,
  SubHeading,
  ContentContainer,
  NavButtonsContainer,
  Link,
} from '../../styled';
import FileUploader from './sub-components/file-uploader';
import SuccessInfoBox from './sub-components/success-info-box';
import ErrorInfoBox from './sub-components/error-info-box';
import Instructions from './sub-components/instructions';
import {InstructionsLinkContainer} from './styled';

interface Props {
  uploadItems?: Record<string, string>[];
  router: NextRouter;
  goToNextStep: () => void;
  setUploadItems: (items: Record<string, string>[] | undefined) => void;
}

const UploadPane = (props: Props) => {

  const [shouldShowInstructions, setShouldShowInstructions] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <StyledContainerBox>
      {!shouldShowInstructions && (
        <>
          <Heading>Upload file</Heading>
          <SubHeading>Please upload a CSV installation file</SubHeading>
          <ContentContainer>
            <InstructionsLinkContainer>
              <Link onClick={() => setShouldShowInstructions(true)}>
                What should I put in the file?
              </Link>
            </InstructionsLinkContainer>
            {!props.uploadItems && (
              <FileUploader
                setSelectedFile={setSelectedFile}
                setErrorMessage={setErrorMessage}
                setUploadItems={props.setUploadItems}
              />
            )}
            {props.uploadItems && !errorMessage && (
              <SuccessInfoBox
                uploadItems={props.uploadItems}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                setUploadItems={props.setUploadItems}
              />
            )}
            {props.uploadItems && !!errorMessage && (
              <ErrorInfoBox
                selectedFile={selectedFile}
                errorMessage={errorMessage}
                setSelectedFile={setSelectedFile}
                setErrorMessage={setErrorMessage}
              />
            )}
          </ContentContainer>
          <NavButtonsContainer>
            <Button
              content={'Back'}
              ghosted
              onClick={async () => props.router.push('/devices/new')}
            />
            <Button
              color={'green'}
              disabled={!!errorMessage}
              content={'Continue'}
              onClick={props.goToNextStep}
            />
          </NavButtonsContainer>
        </>
      )}
      {shouldShowInstructions && (
        <>
          <Heading>Installation file instructions</Heading>
          <ContentContainer>
            <Instructions />
          </ContentContainer>
          <NavButtonsContainer>
            <Button
              content={'Back'}
              ghosted
              onClick={() => setShouldShowInstructions(false)}
            />
          </NavButtonsContainer>
        </>
      )}
    </StyledContainerBox>
  );
};

export default UploadPane;
