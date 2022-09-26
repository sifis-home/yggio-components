/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
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
