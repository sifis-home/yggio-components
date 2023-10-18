/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import z from 'zod';

import type {RuleButton} from '../../types';

const ruleSchema = z.object({
  _id: z.string(),
  owner: z.string(),
  name: z.string(),
});

const ruleCreationSchema = ruleSchema.omit({
  _id: true,
});

const ruleButtonSchema = z.object({
  name: z.string(),
  ruleId: z.string(),
  owner: z.string(),
  deviceName: z.string(),
  buttonName: z.string(),
  deviceId: z.string(),
});

const ruleButtonCreationDataSchema = ruleButtonSchema.omit({name: true, ruleId: true});
const ruleButtonDeleteDataSchema = ruleButtonSchema.pick({ruleId: true});

const validateRuleButtonCreation = (ruleButton: Omit<RuleButton, '_id'>) => {
  const parsed = ruleButtonCreationDataSchema.parse(ruleButton);
  return parsed;
};

export {
  ruleSchema,
  ruleCreationSchema,
  ruleButtonSchema,
  ruleButtonDeleteDataSchema,

  validateRuleButtonCreation,
};
