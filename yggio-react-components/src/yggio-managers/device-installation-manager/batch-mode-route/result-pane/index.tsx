/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {CSVLink} from 'react-csv';
import {NextRouter} from 'next/router';
import Icon from 'react-icons-kit';
import {ic_error as errorIcon} from 'react-icons-kit/md/ic_error';
import {ic_check_circle as checkCircleIcon} from 'react-icons-kit/md/ic_check_circle';
import {Box} from '@chakra-ui/react';

import {Job} from '../../../../types';
import {installationErrorsSelector, topInstallationErrorsSelector} from './selectors';

import Button from '../../../../components/button';
import COLORS from '../../../../constants/colors';
import {StyledContainerBox} from '../../sub-components';
import {
  Heading,
  SubHeading,
  ContentContainer,
  NavButtonsContainer,
  CsvLinkWrapper,
} from '../../styled';
import {
  Section,
  NumItem,
  TopError,
} from './styled';

interface Props {
  router: NextRouter;
  result: Job;
  uploadItems: Record<string, string>[];
}

const ResultPane = (props: Props) => {

  const installationErrors = installationErrorsSelector({
    job: props.result,
    uploadItems: props.uploadItems,
  });

  const topInstallationErrors = topInstallationErrorsSelector({installationErrors});

  return (
    <StyledContainerBox>
      <Heading>Result</Heading>
      <SubHeading>The installation finished with the following result</SubHeading>
      <ContentContainer>
        <Section>
          {props.result.numSuccesses > 0 && (
            <NumItem>
              <Box color={COLORS.greenMedium}>
                <Icon size={'20'} icon={checkCircleIcon as object} />
              </Box>
              <p>{props.result.numSuccesses} devices was successfully installed</p>
            </NumItem>
          )}
          {props.result.numFailures > 0 && (
            <NumItem>
              <Box color={COLORS.greenMedium}>
                <Icon size={'20'} icon={errorIcon as object} />
              </Box>
              <p>{props.result.numFailures} devices failed to install</p>
            </NumItem>
          )}
        </Section>
        {installationErrors.length > 0 && (
          <>
            <Section>
              <p>The most common errors that occured was:</p>
              <ul>
                {_.map(topInstallationErrors, err => (
                  <TopError key={err.error}>
                    {err.error} <i>({err.occurences} occurences)</i>
                  </TopError>
                ))}
              </ul>
            </Section>
            <Section>
              <p>To see the full list of errors:</p>
              <CsvLinkWrapper>
                <CSVLink
                  data={installationErrors}
                  filename={'errors.csv'}
                  target={'_blank'}
                  enclosingCharacter={''}
                >
                  Download errors file
                </CSVLink>
              </CsvLinkWrapper>
            </Section>
          </>
        )}
      </ContentContainer>
      <NavButtonsContainer flexDirection={'row-reverse'}>
        <Button
          content={'Done'}
          onClick={async () => props.router.push('/devices')}
          ghosted
        />
      </NavButtonsContainer>
    </StyledContainerBox>
  );
};

export default ResultPane;
