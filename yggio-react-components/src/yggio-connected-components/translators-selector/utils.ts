/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';

import {TranslatorPreference, TranslatorPreferenceUpgradePolicy} from '../../types';

const setVersion = (array: TranslatorPreference[], index: number, version: string) => {
  const newArray = _.cloneDeep(array);
  newArray[index].version = version;
  return newArray;
};

const setUpgradePolicy = (
  array: TranslatorPreference[],
  index: number,
  upgradePolicy: TranslatorPreferenceUpgradePolicy
) => {
  const newArray = _.cloneDeep(array);
  newArray[index].upgradePolicy = upgradePolicy;
  return newArray;
};

const removeItem = (array: TranslatorPreference[], index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

const moveItem = (array: TranslatorPreference[], index: number, move: number) => {
  const newArray = _.cloneDeep(array);
  const element = newArray[index];
  newArray.splice(index, 1);
  newArray.splice(index + move, 0, element);
  return newArray;
};

export {
  setVersion,
  setUpgradePolicy,
  removeItem,
  moveItem,
};
