/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {FormInputs} from '../../../../types';

const buildSourcePath = ({
  path,
  isGeneric,
}: {path: string, isGeneric?: string}) => {
  if (!path) {
    return null;
  }
  if (isGeneric) {
    return `value_${path}`;
  }
  return path;
};

const isDisabledDatePicker = (formInputs: FormInputs) => {
  const presetValue = formInputs.preset.value;
  const disablingPresets = ['a', 'b', 'c', 'd'];

  return _.includes(disablingPresets, presetValue);
};

export {
  buildSourcePath,
  isDisabledDatePicker,
};
