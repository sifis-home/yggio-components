import {useQuery, useMutation, QueryClient} from '@tanstack/react-query';

import {
  locationsRequests,
  devicesRequests,
} from '../../../../api';
import {selectCreateDeviceData, selectLocationWithInsertedDevice} from './selectors';
import {Forms, UpdateLocationMutation} from '../types';
import {Locations, TranslatorPreference} from '../../../../types';

const useFetchLocationsQuery = () => (
  useQuery(
    ['locations'],
    async () => locationsRequests.fetch(),
  )
);

const useCreateDeviceMutation = (
  incrementCurrentStep: () => void,
  updateLocationMutation: UpdateLocationMutation,
  queryClient: QueryClient,
) => (
  useMutation(async (variables: {
    forms: Forms,
    translatorPreferences: TranslatorPreference[],
    locations?: Locations,
  }) => {
    const deviceData = selectCreateDeviceData(variables.forms, variables.translatorPreferences);
    return devicesRequests.create(deviceData);
  }, {
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries(['devices']);
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
  useCreateDeviceMutation,
};
