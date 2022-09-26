/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';

import {Device} from '../../../types';

const assertDataIsNotTooLarge = (items: Record<string, string>[], requestBodySizeLimit: number) => {
  const fileNumBytes = new TextEncoder().encode(JSON.stringify(items)).length;
  if (fileNumBytes <= requestBodySizeLimit) return;
  const limitInKBRounded = Math.round(requestBodySizeLimit / (1024 * 100)) / 100;
  const fileNumKiloBytesRounded = Math.round(fileNumBytes / (1024 * 100)) / 100;
  throw Error(`Uploaded file contains too much data. It results in ${fileNumKiloBytesRounded} KB and can max be ${limitInKBRounded} KB.`);
};

const resolveConnectorName = (loraConnectorDevices: Device[], connector: string) => {
  if (connector === 'none') {
    return 'None';
  }
  return _.find(loraConnectorDevices, {_id: connector})?.downlinkQueue;
};

export {
  assertDataIsNotTooLarge,
  resolveConnectorName,
};
