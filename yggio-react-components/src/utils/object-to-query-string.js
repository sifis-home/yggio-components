/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';

const objectToQueryString = params => {
  if (!params) return '';
  const array = _.map(params, (v, k) => {
    return _([k, v]).map(encodeURIComponent).join('=');
  });
  return `?${_.join(array, '&')}`;
};

export default objectToQueryString;
