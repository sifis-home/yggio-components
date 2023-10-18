import React from 'react';
import _ from 'lodash';
import {CSVLink} from 'react-csv';
import {
  MdErrorOutline as ErrorIcon,
  MdCheckCircle as CheckCircleIcon,
} from 'react-icons/md';
import {Box} from '@chakra-ui/react';

import {jobTypes} from 'yggio-types';
import {installationErrorsSelector, topInstallationErrorsSelector} from './selectors';

import Button from '../../components/button';
import {COLORS} from '../../constants';
import {
  Heading,
  ResultSubHeading,
  Paragraph,
  Section,
  NumItem,
  TopError,
  CsvLinkWrapper,
} from './styled';

interface Props {
  job: jobTypes.Job;
  items: Record<string, string>[];
  onDoneClick: () => void;
  successesText: string;
  errorsText: string;
}

const ResultPane = (props: Props) => {

  const installationErrors = installationErrorsSelector({
    job: props.job,
    items: props.items,
  });

  const topInstallationErrors = topInstallationErrorsSelector({installationErrors});

  return (
    <>
      <Heading>Finished</Heading>
      <ResultSubHeading>Operation finished with the following result:</ResultSubHeading>
      <Section>
        {props.job.numSuccesses > 0 && (
          <NumItem>
            <Box color={COLORS.greenMedium}>
              <CheckCircleIcon size={21} />
            </Box>
            <p>{props.job.numSuccesses} {props.successesText}</p>
          </NumItem>
        )}
        {props.job.numFailures > 0 && (
          <NumItem>
            <Box color={COLORS.redDark}>
              <ErrorIcon size={20} />
            </Box>
            <p>{props.job.numFailures} {props.errorsText}</p>
          </NumItem>
        )}
      </Section>
      {installationErrors.length > 0 && (
        <>
          <Section>
            <Paragraph>The most common errors that occured was:</Paragraph>
            {_.map(topInstallationErrors, err => (
              <TopError key={err.error}>
                ● {err.error} <i>({err.occurences} occurences)</i>
              </TopError>
            ))}
          </Section>
          <Section>
            <Paragraph>To see the full list of errors:</Paragraph>
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
      <Button
        content={'Done'}
        onClick={props.onDoneClick}
        ghosted
      />
    </>
  );
};

export default ResultPane;
