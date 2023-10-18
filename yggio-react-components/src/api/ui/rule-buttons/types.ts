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
