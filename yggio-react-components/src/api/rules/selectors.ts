/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {Rules, Rule, IdKeyedRules} from '../../types';

const selectRulesData = (data: Rules) => (
  _.reduce(data, (acc: IdKeyedRules, curr: Rule) => {
    const i = curr._id;
    acc[i] = curr;
    return acc;
  }, {})
);

export {
  selectRulesData,
};
