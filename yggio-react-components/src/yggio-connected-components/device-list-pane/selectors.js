/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {compose} from 'lodash/fp';
import {createSelector} from 'reselect';
import getDeviceStatus from '../../utils/get-device-status';
import {FILTER_TAGS_NAMES} from './constants';
import {getDeviceValues} from './utils';
import {createIdKeyedObject} from '../../utils';

const selectTags = createSelector(
  props => props.formInputs,
  formInputs => {
    const arr = [];

    if (_.get(formInputs, 'filterName.value')) {
      arr.push({
        inputName: 'filterName',
        text: `${FILTER_TAGS_NAMES.filterName}: ${_.get(formInputs, 'filterName.value')}`,
      });
    }

    if (_.get(formInputs, 'filterDeviceModelName.value')) {
      arr.push({
        inputName: 'filterDeviceModelName',
        text: `${FILTER_TAGS_NAMES.filterDeviceModelName}: ${_.get(formInputs, 'filterDeviceModelName.value')}`,
      });
    }

    if (_.get(formInputs, 'filterType.value')) {
      arr.push({
        inputName: 'filterType',
        text: `${FILTER_TAGS_NAMES.filterType}: ${_.get(formInputs, 'filterType.value')}`,
      });
    }

    return arr;
  }
);

const selectPageInfo = createSelector(
  props => props.currentPage,
  props => props.pageSize,
  props => props.devices,
  props => props.numFilteredDevices,
  props => props.t,
  (currentPage, pageSize, devices, numFilteredDevices, t) => {
    if (!devices) return '';
    const from = (currentPage - 1) * pageSize + 1;
    const to = from + devices.length - 1;
    return `${_.capitalize(t('titles.showing'))} ${from}-${to} ${t('common.of')} ${numFilteredDevices}`;
  },
);

// Query selectors

const selectDevicesData = data => {
  const res = createIdKeyedObject(data, '_id');
  return res;
};

const selectAccessRightsData = data => {
  const res = createIdKeyedObject(data, 'resourceId');
  return res;
};

const selectCalculationsData = data => {
  const res = createIdKeyedObject(data, '_id');
  return res;
};

const selectDecoratedDevices = createSelector(
  props => props.devices,
  props => props.calculations,
  props => props.t,
  (devices, calculations, t) => {
    const statusCreator = devices => {
      return _.map(devices, device => {
        return {...device, status: getDeviceStatus(device, calculations, t)};
      });
    };
    const valueCreator = devices => {
      return _.map(devices, device => {
        return {...device, values: getDeviceValues(device, t)};
      });
    };
    const decoratedDevices = compose(valueCreator, statusCreator)(devices);
    return decoratedDevices;
  },
);

export {
  selectPageInfo,
  selectTags,
  selectDevicesData,
  selectAccessRightsData,
  selectCalculationsData,
  selectDecoratedDevices,
};
