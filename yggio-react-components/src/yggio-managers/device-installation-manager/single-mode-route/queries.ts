import {useMutation} from '@tanstack/react-query';

import {locationsRequests} from '../../../api';
import {Location} from '../../../types';

const useUpdateLocationMutation = (incrementCurrentStep: () => void) => (
  useMutation(async (location: Location) => {
    return locationsRequests.update(location);
  }, {
    onSettled: () => {
      incrementCurrentStep();
    },
  })
);

export {
  useUpdateLocationMutation,
};
