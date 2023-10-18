/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {useQuery} from '@tanstack/react-query';
import {translatorsRequests} from '.';

const useTranslatorsQuery = (deviceModelName?: string) => useQuery(
  ['translators', deviceModelName],
  async () => translatorsRequests.fetch(deviceModelName),
);

export {
  useTranslatorsQuery,
};
