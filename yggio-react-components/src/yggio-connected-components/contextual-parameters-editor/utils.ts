/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {confirmAlert} from 'react-confirm-alert';
import _ from 'lodash';

import {Parameter} from '../../types';

const showNameConflictPromt = (name: string) => {
  confirmAlert({
    title: 'Name conflict',
    message: `A parameter with name: "${name}" already exists. Please choose another name.`,
    buttons: [{label: 'Ok', onClick: () => null}]
  });
};

const showRemovePromt = (name: string, performRemove: () => void) => {
  const buttons = [
    {
      label: 'Yes',
      onClick: () => performRemove(),
    },
    {
      label: 'No',
      onClick: () => null,
    }
  ];
  confirmAlert({
    title: 'Remove contextual parameter?',
    message: `Are you sure you want the remove: "${name}"?`,
    buttons,
  });
};

const numberRegex = /^-?\d*\.?\d+$/;

const convertToAppropriateType = (value: string) => {
  try {
    return (JSON.parse(value)) as Record<string, string>;
  } catch (error) {
    if (numberRegex.test(value)) {
      return Number(value);
    }
    return value;
  }
};

const returnType = (value: unknown) => {
  if (numberRegex.test(JSON.stringify(value))) {
    return 'Number';
  }
  if (_.startsWith(JSON.stringify(value), '[')) {
    return 'List';
  }
  if (_.startsWith(JSON.stringify(value), '{')) {
    return 'Object';
  }
  if (JSON.stringify(value).length === 0) {
    return '';
  }
  return 'Text';
};

const hasNameConflict = (parametersExcludingCurrent: Parameter[], name: string) => {
  return _.some(parametersExcludingCurrent, ['name', name]);
};

export {
  showNameConflictPromt,
  showRemovePromt,
  convertToAppropriateType,
  hasNameConflict,
  returnType,
};
