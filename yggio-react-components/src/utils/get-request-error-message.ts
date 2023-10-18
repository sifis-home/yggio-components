/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {AxiosError} from 'axios';

const getRequestErrorMessage = (error: unknown) => {
  const axiosError = error as AxiosError<unknown>;
  if (_.isString(axiosError)) {
    return axiosError;
  }
  if (!axiosError.response) {
    return 'No response from server';
  }
  const {status, statusText, data} = axiosError.response;
  if (data) {
    return `${status} - ${data}`;
  }
  if (statusText) {
    return `${status} - ${statusText}`;
  }
  return status.toString();
};

export default getRequestErrorMessage;
