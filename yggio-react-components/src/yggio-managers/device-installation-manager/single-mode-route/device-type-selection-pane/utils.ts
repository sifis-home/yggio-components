/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
