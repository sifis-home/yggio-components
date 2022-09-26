/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {useQuery, useMutation, QueryClient} from '@tanstack/react-query';
import {Location} from '../../types';
import {locationsRequests} from '.';

const useLocationsQuery = () => (
  useQuery(
    ['locations'],
    async () => locationsRequests.fetch(),
    {
      keepPreviousData: true,
    }
  )
);

const useLocationsWithDeviceQuery = (deviceId: string) => (
  useQuery(
    ['locations', deviceId],
    async () => locationsRequests.fetch({device: deviceId}),
    {
      keepPreviousData: true,
    }
  )
);

const useLocationQuery = (locationId: string) => (
  useQuery(
    ['location'],
    async () => locationsRequests.fetchOne(locationId),
    {
      keepPreviousData: true,
    }
  )
);

const useUpdateLocation = (queryClient: QueryClient) => useMutation(
  async (data: Partial<Location>) => locationsRequests.update(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['locations']);
    }
  }
);

const useCreateLocation = (queryClient: QueryClient) => useMutation(
  async (data: Location) => locationsRequests.create(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['locations']);
    }
  }
);

const useRemoveLocation = (queryClient: QueryClient) => useMutation(
  async (locationId: string) => locationsRequests.remove(locationId),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['locations']);
    }
  }
);

export {
  useLocationsQuery,
  useLocationsWithDeviceQuery,
  useLocationQuery,
  useUpdateLocation,
  useCreateLocation,
  useRemoveLocation,
};
