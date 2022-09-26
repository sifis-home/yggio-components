/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {range, compose, map, add, divide} from 'lodash/fp';

const paginationNumberOfPagesSelector = ({totalItemsCount, pageSize}) => {
  const computeNumberOfPages = length => divide(length, pageSize);

  return compose(
    map(add(1)),
    range(0),
    Math.ceil,
    computeNumberOfPages,
  )(totalItemsCount);
};

export {
  paginationNumberOfPagesSelector,
};
