﻿/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {slice, compose, values} from 'lodash/fp';

const selectPaginatedData = ({items, pageSize, currentPage}) => {
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex - pageSize;

  return compose(
    slice(endIndex, startIndex),
    values,
  )(items);
};

export {
  selectPaginatedData,
};
