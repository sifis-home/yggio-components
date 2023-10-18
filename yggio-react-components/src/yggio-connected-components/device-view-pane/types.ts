/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {IconType} from 'react-icons';

interface CalculatedValue {
  id: string;
  value: number;
  from: string;
  to: string;
  date: string;
}

interface CalculatedValues {
  [key: string]: CalculatedValue;
}

interface ChirpstackQueueResponse {
  items: {
    data: string;
    fPort: string;
    confirmed: string;
    fCnt: string;
  }[]
}

interface NetmoreQueueItem {
  requestPayloadHex: string;
  requestFPort: string;
}

type NetmoreQueueResponse = NetmoreQueueItem[];

type GetQueueResponse = ChirpstackQueueResponse | NetmoreQueueResponse;

interface QueueItem {
  data: string;
  fPort: string;
  confirmed?: string;
  fCnt?: string;
}

interface TabItem {
  name: string;
  path: string;
  width?: number;
  icon: {
    file: IconType;
    size: number;
    topPosition?: number;
  }
}

export type {
  CalculatedValues,
  CalculatedValue,
  ChirpstackQueueResponse,
  NetmoreQueueResponse,
  GetQueueResponse,
  QueueItem,
  TabItem,
};
