﻿/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {useQuery, useMutation, QueryClient} from '@tanstack/react-query';
import {Rules, RuleCreationTemplate} from '../../types/rules';
import {rulesRequests} from '.';
import {selectRulesData} from './selectors';

const useRulesQuery = () => useQuery(
  ['rules'],
  async () => rulesRequests.fetch(),
  {
    select: selectRulesData,
  },
);

const useNumRulesQuery = () => useQuery(
  ['rules', 'size'],
  async () => rulesRequests.fetch(),
  {select: (data: Rules) => _.size(data)},
);

const useCreateRule = (queryClient: QueryClient) => useMutation(
  async (data: RuleCreationTemplate) => rulesRequests.create(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['rules']);
    }
  }
);

const useRemoveRule = (queryClient: QueryClient) => useMutation(
  async ({
    ruleId,
    actionId,
  }: {ruleId: string, actionId: string}) => rulesRequests.remove(ruleId, actionId),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['rules']);
    }
  }
);

const useActivateRule = () => useMutation(
  ['rule', 'activation'],
  async ({ruleId, deviceId}: {ruleId: string; deviceId: string}) => rulesRequests.activate(ruleId, deviceId),
);

export {
  useRulesQuery,
  useNumRulesQuery,
  useCreateRule,
  useRemoveRule,
  useActivateRule,
};
