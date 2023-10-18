/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type {Collection} from 'mongodb';

import {REQUEST_METHODS} from '../../constants';
import {validateRuleButtonCreation} from './validation';

import type {CommandData, Bodies, Queries, RuleButtonQuery, RuleButton} from '../../types';

const RULES_URL = 'http://rest-api/api/rules/rules';

// type predicates
const isRuleButtonQuery = (data: Queries): data is RuleButtonQuery => {
  return (data as RuleButtonQuery).owner !== undefined;
};
const isRuleButtonBody = (data: Bodies): data is RuleButton => {
  return (data as RuleButton).deviceId !== undefined;
};
const isRuleButtonDeletionBody = (data: Bodies): data is RuleButton => {
  return (data as RuleButton).ruleId !== undefined;
};

const getRuleButtonCommands = (coll: Collection) => ({

  [REQUEST_METHODS.get]: async ({query}: CommandData) => {
    if (isRuleButtonQuery(query)) {
      const ruleButtons = await coll
        .find(query)
        .toArray();
      return ruleButtons;
    }
  },

  [REQUEST_METHODS.post]: async ({data, authToken}: CommandData) => {
    if (isRuleButtonBody(data)) {
      const validatedData = validateRuleButtonCreation(data);

      const response = await fetch(RULES_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          owner: validatedData.owner,
          name: `${validatedData.deviceName}.${validatedData.buttonName}`,
        }),
      });


      if (!response.ok) {
        throw new Error('Failed to create rule in Yggio');
      }

      const rule = await response.json() as {_id: string};

      // Create rule button in BFF database
      const doc = {
        name: validatedData.buttonName,
        owner: validatedData.owner,
        ruleId: rule._id,
        deviceId: validatedData.deviceId,
      };
      const result = await coll.insertOne(doc);

      return {
        _id: result.insertedId,
        ...validatedData,
      };
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  [REQUEST_METHODS.put]: () => {}, // FIXME: no-op for TS, will be fixed in future

  [REQUEST_METHODS.delete]: async ({data, authToken}: CommandData) => {
    // Delete rule in Yggio
    if (isRuleButtonDeletionBody(data)) {
      const response = await fetch(`${RULES_URL}/${data.ruleId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete rule in Yggio');
      }

      // Delete rule button in BFF database
      const {acknowledged} = await coll.deleteOne({ruleId: data.ruleId});
      return acknowledged;
    }
  },
});

export default getRuleButtonCommands;
