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
