/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';

import {jobTypes} from 'yggio-types';
import ProgressView from './progress-view';
import ResultView from './result-view';

interface BatchOperationViewProps {
  job?: jobTypes.Job;
  items: Record<string, string>[];
  onDoneClick: () => void;
  progressHeading: string;
  successesText: string;
  errorsText: string;
}

const BatchOperationView = (props: BatchOperationViewProps) => {
  if (!props.job) {
    return (
      <p>Loading!</p>
    );
  }
  if (props.job.numUnprocessed === 0) {
    return (
      <ResultView
        job={props.job}
        items={props.items}
        onDoneClick={props.onDoneClick}
        successesText={props.successesText}
        errorsText={props.errorsText}
      />
    );
  }
  return (
    <ProgressView
      job={props.job}
      progressHeading={props.progressHeading}
    />
  );
};

export default BatchOperationView;
