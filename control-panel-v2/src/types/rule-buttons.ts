/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import z from 'zod';

import {
  ruleSchema,
  ruleCreationSchema,
  ruleButtonSchema,
  ruleButtonDeleteDataSchema,
} from '../commands/rule-buttons/validation';

type Rule = z.infer<typeof ruleSchema>;
type RuleBody = z.infer<typeof ruleCreationSchema>;
type RuleButton = z.infer<typeof ruleButtonSchema>;
type RuleButtonDeleteData = z.infer<typeof ruleButtonDeleteDataSchema>;

interface RuleButtonQuery {
  owner: string;
  deviceId: string;
}

export type {
  Rule,
  RuleBody,
  RuleButton,
  RuleButtonDeleteData,
  RuleButtonQuery,
};
