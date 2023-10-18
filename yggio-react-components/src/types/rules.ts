/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

interface Rule {
  _id: string;
  disabled?: boolean;
  events?: {action: RuleAction}[];
  name: string;
  owner: string;
  triggers: unknown[];
}

type Rules = Rule[];

interface IdKeyedRules {
  [_id: string]: Rule;
}

// NOTE: Not sure which should be optional
interface RuleAction {
  _id: string;
  actionType?: string;
  allowMulticast?: boolean;
  groupName?: string;
  hidden?: boolean;
  message?: {
    confirmed: boolean;
    fPort: string;
    data: string;
    reference: string;
  },
  name: string;
  owner: string;
}

interface RuleCreationTemplate {
  rule: Omit<Rule, '_id'>;
  action: Omit<RuleAction, '_id'>;
}

interface RuleButton {
  _id: string;
  name: string;
  owner: string;
  buttonName: string;
  deviceName: string;
  deviceId: string;
  message: {
    command: string;
  };
  actionType: string;
  ruleId: string;
}

type CreateRuleButton = Omit<RuleButton, '_id' | 'name' | 'ruleId'>;

export type {
  Rule,
  Rules,
  IdKeyedRules,
  RuleAction,
  RuleCreationTemplate,
  RuleButton,
  CreateRuleButton,
};
