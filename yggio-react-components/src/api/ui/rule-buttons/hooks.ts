/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {useQuery, useMutation, QueryClient} from '@tanstack/react-query';
import {toast} from 'react-hot-toast';
import {ruleButtonsRequests} from '.';
import {getRequestErrorMessage} from '../../../utils';

import type {
  RuleButtonsQuery,
  RuleButtonCreation,
  RuleButtonDeletion,
} from './types';

const useRuleButtonsQuery = ({owner, deviceId}: RuleButtonsQuery) => useQuery(
  ['ui', 'rule-buttons', owner, deviceId],
  async () => ruleButtonsRequests.get({owner, deviceId}),
);

const useCreateRuleButtonMutation = (queryClient: QueryClient) => useMutation(
  async ({data}: RuleButtonCreation) => ruleButtonsRequests.create({data}),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['ui', 'rule-buttons']);
    },
    onError: err => {
      toast.error(getRequestErrorMessage(err));
    },
  },
);

const useRemoveRuleButtonMutation = (queryClient: QueryClient) => useMutation(
  async ({data}: RuleButtonDeletion) => ruleButtonsRequests.remove({data}),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['ui', 'rule-buttons']);
    },
  },
);

export {
  useRuleButtonsQuery,
  useCreateRuleButtonMutation,
  useRemoveRuleButtonMutation,
};
