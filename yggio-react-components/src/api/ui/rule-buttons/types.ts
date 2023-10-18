/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {RuleButton, CreateRuleButton} from '../../../types';

interface RuleButtonsQuery {
  owner: string;
  deviceId?: string;
}

interface RuleButtonCreation {
  data: CreateRuleButton;
}

interface RuleButtonDeletion {
  data: Pick<RuleButton, 'ruleId'>;
}

export type {
  RuleButtonsQuery,
  RuleButtonCreation,
  RuleButtonDeletion,
};
