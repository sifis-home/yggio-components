/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
const NETWORK_ERROR_MESSAGE = 'Network Error';
const CONNECTIVITY_ERROR_MESSAGE = 'Is not connected to Yggio';
const CONNECTIVITY_ERROR = new Error(CONNECTIVITY_ERROR_MESSAGE);

export {
  NETWORK_ERROR_MESSAGE,
  CONNECTIVITY_ERROR_MESSAGE,
  CONNECTIVITY_ERROR,
};
