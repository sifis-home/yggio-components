/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {DataViewerProps, DataProps} from './types';

const createValue = (key: string, value: DataProps, type?: string) => {
  if (typeof value === 'object') {
    return {
      name: {key},
      children: _.map(value, (curr, i) => ({name: {key: i, value: curr}})),
    };
  }

  return {
    name: {key, value, type},
  };
};

const createTreeData = (data: Record<string, DataProps>) => {
  const result = _.reduce(data, (acc: DataProps[], curr, key) => {
    if (_.isString(curr)) {
      const value = createValue(key, curr, 'string');
      acc.push(value);
    }
    if (_.isNull(curr)) {
      const value = createValue(key, 'null', 'noValue');
      acc.push(value);
    }
    if (_.isUndefined(curr)) {
      const value = createValue(key, 'undefined', 'noValue');
      acc.push(value);
    }
    if (_.isBoolean(curr)) {
      const value = createValue(key, curr.toString(), 'bool');
      acc.push(value);
    }
    if (_.isNumber(curr)) {
      const value = createValue(key, curr.toString(), 'number');
      acc.push(value);
    }
    if (_.isObjectLike(curr)) {
      const t = createTreeData(curr as Record<string, DataViewerProps['data']>);
      acc.push({name: {key}, children: t});
    }
    return acc;
  }, []);
  return result;
};


export {
  createTreeData,
};
