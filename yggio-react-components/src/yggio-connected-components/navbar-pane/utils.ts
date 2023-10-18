import cookie from 'js-cookie';
import _ from 'lodash';

import {logsTypes} from '../../api';

const removeAllCookies = () => {
  // @ts-ignore - Seemingly some kind of hack that ts don't like, but it works
  _(cookie.get(null))
    .keys()
    .map(cookie.remove)
    .value();
};

const countLogsByPriorityType = (logs?: logsTypes.FetchedLog[]) => {
  let numHigh = 0;
  let numSevere = 0;
  _.forEach(logs, log => {
    if (log.priority === 'high') {
      numHigh += 1;
    } else if (log.priority === 'severe') {
      numSevere += 1;
    }
  });
  return {
    numHigh,
    numSevere,
  };
};

export {
  removeAllCookies,
  countLogsByPriorityType,
};
