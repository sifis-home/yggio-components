import _ from 'lodash';
import {useQuery} from '@tanstack/react-query';

import {
  locationsRequests,
  appRequests,
  organizationsRequests,
} from '../../api';

const useNumOrganizationsQuery = () => useQuery(
  ['organizations'],
  async () => organizationsRequests.fetch(),
  {select: data => _.size(data)}
);

const useNumAppsQuery = () => useQuery(
  ['providers'],
  async () => appRequests.fetch({limit: 1}),
  {select: data => data.headers['total-count']}
);

const useNumLocationsQuery = () => useQuery(
  ['locations'],
  async () => locationsRequests.fetch(),
  {select: data => _.size(data)},
);

export {
  useNumLocationsQuery,
  useNumOrganizationsQuery,
  useNumAppsQuery,
};
