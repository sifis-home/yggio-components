﻿/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {toast} from 'react-hot-toast';
import {Rules, RuleAction, RuleCreationTemplate} from '../../types/rules';
import {request} from '../request';
import {RESOURCE_TYPES, HTTP_METHODS} from '../../constants';

const create = async (template: RuleCreationTemplate) => {
  const {rule, action} = template;

  const actionResult = await request<RuleAction>({
    method: HTTP_METHODS.post,
    URI: RESOURCE_TYPES.rulesActions,
    data: action,
  });

  const ruleResult = await request({
    method: HTTP_METHODS.post,
    URI: RESOURCE_TYPES.rules,
    data: {
      ...rule,
      events: [{action: actionResult._id}],
    },
  });
  return ruleResult;
};

const remove = async (ruleId: string, actionId: string) => {
  await request({
    method: HTTP_METHODS.delete,
    URI: `${RESOURCE_TYPES.rulesActions}/${actionId}`,
  });
  await request({
    method: HTTP_METHODS.delete,
    URI: `${RESOURCE_TYPES.rules}/${ruleId}`,
  });
  return ruleId;
};

interface ActivationResult {
  ok: boolean;
}

const activate = async (ruleId: string, deviceId: string) => {
  const res = await request<ActivationResult>({
    method: HTTP_METHODS.put,
    URI: `${RESOURCE_TYPES.rules}/activate/${ruleId}`,
    data: {
      ok: true,
      iotnodeId: deviceId
    },
  });

  // Kinda dirty hack for special toaster trigger
  if (res.ok) {
    const successMessage = 'Action triggered successfully';
    toast.success(successMessage);
  }
};

const fetch = async () => request<Rules>({
  method: HTTP_METHODS.get,
  URI: RESOURCE_TYPES.rules,
});

export {
  fetch,
  create,
  activate,
  remove,
};
