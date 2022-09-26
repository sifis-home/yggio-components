/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {formatDistanceToNow} from 'date-fns';

import {Job} from 'src/types';

interface CustomJobTemplate extends Job {
  numItemsDone: number;
  progressPercentage: number;
  isFinished: boolean;
  expectedTimeLeftText: string | null;
}

const selectJob = (job: Job): CustomJobTemplate | undefined => {
  if (!job) return;
  const numItemsDone = job.numFailures + job.numSuccesses;
  const progressPercentage = Math.round((numItemsDone / job.numItems) * 100);
  const isFinished = numItemsDone === job.numItems;
  const expectedTimeLeftText = job.expectedTimeLeft
    ? formatDistanceToNow(Number(new Date()) - job.expectedTimeLeft * 1000)
    : null;
  return {
    ...job,
    numItemsDone,
    progressPercentage,
    isFinished,
    expectedTimeLeftText,
  };
};

export {
  selectJob,
};
