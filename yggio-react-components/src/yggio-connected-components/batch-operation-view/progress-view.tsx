
import _ from 'lodash';
import React from 'react';
import {formatDistanceToNow} from 'date-fns';

import {jobTypes} from 'yggio-types';
import ProgressBar from '../../components/progress-bar';
import {
  Heading,
  ProgressInfoContainer,
} from './styled';

interface ProgressViewProps {
  job: jobTypes.Job;
  progressHeading: string;
}

const ProgressView = (props: ProgressViewProps) => {
  const numItemsDone = props.job.numFailures + props.job.numSuccesses;
  const progressPercentage = Math.round((numItemsDone / props.job.numItems) * 100);
  const expectedTimeLeftText = props.job.expectedTimeLeft
    ? formatDistanceToNow(Number(new Date()) - props.job.expectedTimeLeft * 1000)
    : null;
  return (
    <>
      <Heading>{props.progressHeading}</Heading>
      <ProgressBar
        progress={progressPercentage}
        margin={'50px 0 0 0'}
      />
      <ProgressInfoContainer>
        <p><b>{numItemsDone}</b> of {props.job.numItems} done</p>
        {!_.isNil(expectedTimeLeftText) && (
          <p>Estimated time left: <b>{expectedTimeLeftText}</b></p>
        )}
      </ProgressInfoContainer>
    </>
  );
};

export default ProgressView;
