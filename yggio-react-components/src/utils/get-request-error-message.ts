/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {AxiosError} from 'axios';

const getRequestErrorMessage = (error: unknown) => {
  return `${(error as AxiosError)?.response?.status} - ${(error as AxiosError)?.response?.data}`;
};

export default getRequestErrorMessage;
