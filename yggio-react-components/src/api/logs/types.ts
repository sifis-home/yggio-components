/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {LogTypes} from 'yggio-models';

interface FetchedLog extends Omit<LogTypes.LogWithIdAndResourceName, 'createdAt'> {
  createdAt: string;
}

export type {
  FetchedLog,
};
