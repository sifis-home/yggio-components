/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {LogTypes} from 'yggio-models';
import {request} from '../request';
import {HTTP_METHODS, RESOURCE_TYPES} from '../../constants';

interface FetchParams {
  resourceId?: LogTypes.LogResourceId;
  message?: LogTypes.LogMessage;
  priority?: string;
  type?: string;
  isVerified?: LogTypes.LogIsVerified;
  limit: number;
  cursorId?: string;
  cursorDirection?: string;
}

interface FetchedLog extends Omit<LogTypes.LogWithIdAndResourceName, 'createdAt'> {
  createdAt: string;
}

const fetch = async (params: FetchParams) => request<FetchedLog[]>({
  method: HTTP_METHODS.get,
  URI: RESOURCE_TYPES.logs,
  params,
});

const update = async (logId: string, updates: LogTypes.UpdateLogData) => request<LogTypes.LogWithId[]>({
  method: HTTP_METHODS.put,
  URI: `${RESOURCE_TYPES.logs}/${logId}`,
  data: updates,
});

export {
  fetch,
  update,
};

export type {
  FetchedLog,
};
