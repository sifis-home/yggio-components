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
