/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {useQuery, useMutation} from '@tanstack/react-query';

import {
  locationsRequests,
  devicesRequests,
} from '../../../../api';
import {selectCreateDeviceData, selectLocationWithInsertedDevice} from './selectors';
import {Forms, UpdateLocationMutation} from '../types';
import {Locations} from '../../../../types';

const useFetchLocationsQuery = () => (
  useQuery(
    ['locations'],
    async () => locationsRequests.fetch(),
  )
);

const useFetchDeviceModelNamesQuery = () => (
  useQuery(
    ['deviceModelNames'],
    async () => devicesRequests.getModelNames(),
  )
);

const useCreateDeviceMutation = (
  incrementCurrentStep: () => void,
  updateLocationMutation: UpdateLocationMutation,
) => (
  useMutation(async (variables: {forms: Forms, locations?: Locations}) => {

    const deviceData = selectCreateDeviceData(variables.forms);

    return devicesRequests.create(deviceData);
  }, {
    onSuccess: (data, variables) => {
      // Update location if one was selected
      if (variables.forms.details.formInputs.blueprint.value && variables.locations) {
        const deviceId = data._id;
        const location = selectLocationWithInsertedDevice(
          deviceId,
          variables.locations,
          variables.forms.details.formInputs.location.value as string,
          variables.forms.details.formInputs.blueprint.value as string
        );
        updateLocationMutation.mutate(location);
      } else {
        incrementCurrentStep();
      }
    },
  })
);

export {
  useFetchLocationsQuery,
  useFetchDeviceModelNamesQuery,
  useCreateDeviceMutation,
};
