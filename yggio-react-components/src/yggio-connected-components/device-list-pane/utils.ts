/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {NextRouter} from 'next/router';
import queryString from 'query-string';
import {millisecondsToHours, millisecondsToMinutes} from 'date-fns';

import type {StylesConfig} from 'react-select';

import {COLORS} from '../../constants';
import {
  Device,
  Translate,
  FormInputs,
} from '../../types';
import {
  KNOWN_VALUES,
  COLUMN_PRESETS,
} from './constants';

import type {Column, ListStateProps} from './types';


const createMatchPattern = (formInputs: FormInputs) => {
  const name = formInputs.filterName.value as string;
  const deviceModelName = formInputs.filterDeviceModelName.value as string;
  const devEui = formInputs.filterDevEui.value as string;
  const connector = formInputs.filterConnector.value as unknown as string;
  const [, connectorId] = _.split(connector, '_');
  const contextMapKey = formInputs.filterContextualParameterKey.value as string;
  const contextMapValue = formInputs.filterContextualParameterValue.value as string;

  const matchPatterns: Record<string, string> = {};
  if (name) {
    matchPatterns.name = name;
  }
  if (deviceModelName) {
    matchPatterns.deviceModelName = deviceModelName;
  }
  if (devEui) {
    matchPatterns.devEui = devEui;
  }
  if (connector) {
    matchPatterns.connector = connectorId;
  }
  if (contextMapKey) {
    matchPatterns[`contextMap.${contextMapKey}`] = contextMapValue;
  }
  if (!_.isEmpty(matchPatterns)) {
    return matchPatterns;
  }
};

const createAttributeFilter = (formInputs: FormInputs) => {
  const typeFilter = formInputs.filterType.value;
  if (typeFilter === 'connector') {
    return 'downlinkQueue';
  }
  if (typeFilter === 'device') {
    return '!downlinkQueue';
  }
  return null;
};

const createOrderByParam = (field: string, order: string) => {
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

interface ListState {
  pageSize: number;
  currentPage: number;
  sortingField: string;
  sortingOrder: string;
  cursorId: string | null;
  cursorDirection: string | null;
}

const getDevicesQueryParams = (
  filterFormInputs: FormInputs,
  listState: ListState,
) => {
  const q = _.get(filterFormInputs, 'filterQ.value');
  const matchPattern = createMatchPattern(filterFormInputs);
  const attributeExists = createAttributeFilter(filterFormInputs);
  const orderBy = createOrderByParam(listState.sortingField, listState.sortingOrder);
  const devicesParams = {
    cursorId: listState.cursorId,
    cursorDirection: listState.cursorDirection,
    limit: listState.pageSize,
    orderBy,
    filter: {matchPattern, attributeExists},
    q,
  };
  return devicesParams;
};

const getDeviceValues = (device: Device, t: Translate) => {
  const values = _.reduce(device, (acc, curr, key) => {
    if (_.isObject(curr)) {
      acc = {
        ...acc,
        ..._.mapKeys(curr, (val, index) => `${key}_${index}`),
      };
    } else {
      acc = {...acc, [key]: curr};
    }
    return acc;
  }, {});

  const displayableValues = _.map(values, (curr, key) => {
    const knownValue = KNOWN_VALUES[key];
    if (knownValue) {
      return `${t(`values.${knownValue.name}`)}: ${curr} ${knownValue.unit || ''}`;
    }
  });
  return _.compact(displayableValues);
};

const addColumnOptions = (columns: string[], t: Translate) => {
  const options = _.map(_.without(columns, 'custom'), column => ({
    value: column,
    label: t(`columns.${column}`, {defaultValue: column}),
  }));
  return options;
};

const presetOptions = _.map(COLUMN_PRESETS, (preset, key) => (
  {value: key, label: preset.name}
));

const moveItemUpInArray = (array: Column[], index: number) => {
  const newArray = [...array];
  const temp = newArray[index - 1];
  newArray[index - 1] = newArray[index];
  newArray[index] = temp;
  return newArray;
};

const moveItemDownInArray = (array: Column[], index: number) => {
  const newArray = [...array];
  const temp = newArray[index + 1];
  newArray[index + 1] = newArray[index];
  newArray[index] = temp;
  return newArray;
};

const createReadableExpectedReportInterval = (milliseconds: number) => {
  if (millisecondsToHours(milliseconds)) {
    return `${millisecondsToHours(milliseconds)} hours`;
  }

  return `${millisecondsToMinutes(milliseconds)} minutes`;
};

// TODO: Not ideal
interface ListActionProps {
  setPage: (page: string) => void;
  selectedDevices: string[];
  router: NextRouter;
}

const listActions = {
  configure: (props: ListActionProps) => {
    props.setPage('configuration');
  },
  calculate: (props: ListActionProps) => {
    props.setPage('calculations');
  },
  channels: (props: ListActionProps) => {
    props.setPage('channels');
  },
  setConnector: (props: ListActionProps) => {
    props.setPage('setConnector');
  },
  synchronize: (props: ListActionProps) => {
    props.setPage('synchronize');
  },
  edit: (props: ListActionProps) => {
    props.setPage('editing');
  },
  setReportInterval: (props: ListActionProps) => {
    props.setPage('reportInterval');
  },
  charts: async (props: ListActionProps) => {
    const params = queryString.stringify({devices: props.selectedDevices}, {arrayFormat: 'comma'});
    const url = `/charts?${params}`;
    await props.router.push(url);
  },
  remove: (props: ListActionProps) => {
    props.setPage('deletion');
  },
};

const getListStateSetters = (listState: ListStateProps) => {
  const listStateSetters = {
    columns: listState.setColumns,
    currentPage: listState.setCurrentPage,
    cursorId: listState.setCursorId,
    cursorDirection: listState.setCursorDirection,
    pageSize: listState.setPageSize,
    sortingField: listState.setSortingField,
    sortingOrder: listState.setSortingOrder,
  } as const;
  return listStateSetters;
};

const createDot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colorStyles: StylesConfig<{color: string}> = {
  control: styles => ({...styles, cursor: 'pointer', backgroundColor: COLORS.trueWhite}),
  option: (styles, {data, isFocused}) => {
    return {
      ...styles,
      cursor: 'pointer',
      color: data.color,
      backgroundColor: isFocused ? COLORS.greyLight : undefined,
    };
  },
  input: styles => ({...styles, ...createDot()}),
  placeholder: styles => ({...styles, ...createDot(COLORS.greyLight)}),
  singleValue: (styles, {data}) => ({...styles, ...createDot(data.color)})
};

export {
  getDevicesQueryParams,
  getDeviceValues,
  addColumnOptions,
  presetOptions,
  moveItemUpInArray,
  moveItemDownInArray,
  createReadableExpectedReportInterval,
  listActions,
  getListStateSetters,
  colorStyles,
};
