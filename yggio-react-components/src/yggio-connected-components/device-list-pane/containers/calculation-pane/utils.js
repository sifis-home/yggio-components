/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {DEVICE_PATHS} from './constants';

const buildSourcePath = (type, value, isGeneric) => {
  const {paths} = DEVICE_PATHS[type];
  const availablePaths = _.pick(value, paths);
  const path = _.reduce(availablePaths, (acc, curr, index) => {
    if (_.isPlainObject(curr)) {
      const keys = _.keys(curr);
      _.each(keys, key => {
        acc = `${index}_${key}`;
      });
    }

    if (_.isString(curr) || _.isNumber(curr)) {
      acc = index;
    }
    return acc;
  }, '');

  if (!path) {
    return null;
  }
  if (isGeneric) {
    return `value_${path}`;
  }
  return path;
};

const isDisabledCreateCalculationButton = formInputs => {
  const isValidName = _.get(formInputs, 'name.validation.isValid');
  const isValidDevicePath = _.get(formInputs, 'devicePath.validation.isValid');
  // const isValidCalculationType = _.get(formInputs, 'calculationType.validation.isValid');
  const isValidCreateDeviceName = _.get(formInputs, 'createDeviceName.validation.isValid');
  const isValidDeviceSelection = _.get(formInputs, 'deviceSelection.validation.isValid');
  const isValidDestination = _.get(formInputs, 'destination.validation.isValid');
  const isValidDestinationPath = _.get(formInputs, 'customDestinationPath.validation.isValid');

  const destinationValue = _.get(formInputs, 'destination.value');

  const isValidCreateNewDevice = _.eq(destinationValue, 'createNewDevice') && isValidCreateDeviceName;
  const isValidSelectedDevice = _.eq(destinationValue, 'saveToDevice') && isValidDeviceSelection;

  const isValidSaveDeviceOption = isValidCreateNewDevice || isValidSelectedDevice;

  const validators = [
    isValidName,
    isValidDevicePath,
    // isValidCalculationType,
    isValidDestination,
    isValidSaveDeviceOption,
    isValidDestinationPath,
  ];

  return !_.every(validators);
};

const isDisabledDatePicker = formInputs => {
  const presetValue = _.get(formInputs, 'preset.value');
  const disablingPresets = ['a', 'b', 'c', 'd'];

  return _.includes(disablingPresets, presetValue);
};

// Different sensors have different fields, which is why this is needed to support all
const createValueFields = string => {
  return [
    string,
    `${string}.value`,
  ];
};

export {
  buildSourcePath,
  isDisabledCreateCalculationButton,
  isDisabledDatePicker,
  createValueFields,
};
