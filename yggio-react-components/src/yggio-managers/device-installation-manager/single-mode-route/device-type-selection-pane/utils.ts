import _ from 'lodash';

import {options} from './constants';

const alphabetizeOptions = () => {
  return _.orderBy(options, [
    option => option.label.toLowerCase() !== 'generic',
    option => option.label.toLowerCase() !== 'lorawan',
    option => option.label.toLowerCase()
  ]);
};

export {alphabetizeOptions};
