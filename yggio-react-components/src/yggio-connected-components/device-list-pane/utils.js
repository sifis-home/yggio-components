/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import queryString from 'query-string';
import {millisecondsToHours, millisecondsToMinutes} from 'date-fns';
import {
  KNOWN_VALUES,
  COLUMNS,
  COLUMN_PRESETS,
} from './constants';

const getDeviceValues = (device, t) => {
  if (!device.value) {
    return [];
  }

  const reducer = (acc, curr, key) => {
    if (_.isObject(curr)) {
      acc = {
        ...acc,
        ..._.mapKeys(curr, (val, index) => `${key}_${index}`),
      };
    } else {
      acc = {...acc, [key]: curr};
    }
    return acc;
  };
  const values = _.reduce(device.value, reducer, {});
  const displayableValues = _.map(values, (curr, key) => {
    const knownValue = KNOWN_VALUES[key];
    if (knownValue) {
      return `${t(`values.${knownValue.name}`)}: ${curr} ${knownValue.unit || ''}`;
    }
  });
  return _.compact(displayableValues);
};

const createOrderByParam = (field, order) => {
  const newField = _.eq(field, 'reportedAt')
    ? 'dateModified'
    : field;

  if (_.eq(order, 'asc')) {
    return field;
  }

  if (_.eq(order, 'desc')) {
    return `!${field}`;
  }

  return newField;
};

const createMatchPattern = formInputs => {
  const name = _.get(formInputs, 'filterName.value');
  const deviceModelName = _.get(formInputs, 'filterDeviceModelName.value');
  const devEui = _.get(formInputs, 'filterDevEui.value');

  if (name && deviceModelName && devEui) {
    return {name, deviceModelName};
  }

  if (name) {
    return {name};
  }

  if (deviceModelName) {
    return {deviceModelName};
  }
  if (devEui) {
    return {devEui};
  }
};

const createAttributeFilter = formInputs => {
  const typeFilter = _.get(formInputs, 'filterType.value');
  if (typeFilter === 'connector') {
    return 'downlinkQueue';
  }
  if (typeFilter === 'device') {
    return '!downlinkQueue';
  }
  return null;
};

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const addColumnOptions = (columns, t) => (
  _.reduce(COLUMNS, (acc, column) => {
    if (!_.includes(columns, column.name)) {
      acc.push({value: column.name, label: t(`columns.${column.name}`)});
    }
    return acc;
  }, [])
);

const presetOptions = _.map(COLUMN_PRESETS, (preset, key) => (
  {value: key, label: preset.name}
));

const moveItemUpInArray = (array, index) => {
  const newArray = [...array];
  const temp = newArray[index - 1];
  newArray[index - 1] = newArray[index];
  newArray[index] = temp;
  return newArray;
};

const moveItemDownInArray = (array, index) => {
  const newArray = [...array];
  const temp = newArray[index + 1];
  newArray[index + 1] = newArray[index];
  newArray[index] = temp;
  return newArray;
};

const createReadableExpectedReportInterval = milliseconds => {
  if (millisecondsToHours(milliseconds)) {
    return `${millisecondsToHours(milliseconds)} hours`;
  }

  return `${millisecondsToMinutes(milliseconds)} minutes`;
};

const listActions = {
  configure: props => {
    props.setPage('configuration');
  },
  calculate: props => {
    props.setPage('calculations');
  },
  channels: props => {
    props.setPage('channels');
  },
  setConnector: props => {
    props.setPage('tools');
  },
  edit: props => {
    props.setPage('editing');
  },
  setReportInterval: props => {
    props.setPage('reportInterval');
  },
  charts: props => {
    const params = queryString.stringify({devices: props.selectedDevices}, {arrayFormat: 'comma'});
    const url = `/charts?${params}`;
    props.router.push(url);
  },
  remove: props => {
    props.setPage('deletion');
  },
};

export {
  getDeviceValues,
  createOrderByParam,
  createMatchPattern,
  createAttributeFilter,
  capitalizeFirstLetter,
  addColumnOptions,
  presetOptions,
  moveItemUpInArray,
  moveItemDownInArray,
  createReadableExpectedReportInterval,
  listActions,
};
