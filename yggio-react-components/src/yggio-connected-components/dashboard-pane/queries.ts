/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {useQuery} from '@tanstack/react-query';

import {
  locationsRequests,
  clientAppsRequests,
  organizationsRequests,
} from '../../api';

const useNumOrganizationsQuery = () => useQuery(
  ['organizations'],
  async () => organizationsRequests.fetch(),
  {select: data => _.size(data)}
);

const useNumProvidersQuery = () => useQuery(
  ['providers'],
  async () => clientAppsRequests.fetch(),
  {select: data => _.size(data)},
);

const useNumLocationsQuery = () => useQuery(
  ['locations'],
  async () => locationsRequests.fetch(),
  {select: data => _.size(data)},
);

export {
  useNumLocationsQuery,
  useNumOrganizationsQuery,
  useNumProvidersQuery,
};
