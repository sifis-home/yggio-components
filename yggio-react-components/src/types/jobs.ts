/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {DeviceCommand} from './devices';

interface JobItem {
  errorMessage: string | null;
  inputData: {
    command: string;
    data: DeviceCommand;
    devEui: string;
    integrationName: string;
  }
  inputIndex: number;
  jobId: number;
  status: string;
}

interface Job {
  expectedTimeLeft: number;
  isCanceled: boolean;
  items: JobItem[];
  numFailures: number;
  numItems: number;
  numSuccesses: number;
  numUnprocessed: number;
  ownerId: string;
  _id: string;
}

type Jobs = Job[];

export {
  Jobs,
  Job,
};
