/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {createSelector} from 'reselect';
import {DEVICE_PATHS} from './constants';

const accessibleDevicePathsSelector = createSelector(
  props => props.selectedDevices,
  props => props.devices,
  (selectedDevicesIds, devices) => {
    const selectedDevices = _.pick(devices, selectedDevicesIds);
    const obtainableDevicePaths = _.reduce(selectedDevices, (acc, curr) => {
      const keys = _.keys(curr);
      const matchPaths = _.filter(DEVICE_PATHS, ({paths, label, value}) => {
        const accessiblePaths = _.filter(paths, path => {
          return _.includes(keys, path);
        });
        if (!_.isEmpty(accessiblePaths)) {
          return {
            label,
            value,
          };
        }
      });
      if (matchPaths) {
        acc = [...acc, ...matchPaths];
      }
      return acc;
    }, []);
    return _.uniq(obtainableDevicePaths);
  }
);

const selectableDevicesSelector = createSelector(
  props => props.devices,
  devices => {
    return _.map(devices, curr => {
      return {
        value: curr._id,
        label: curr.name,
      };
    }, []);
  }
);

const selectableCalculationsSelector = createSelector(
  props => props.calculations,
  calculations => {
    return _.map(calculations, curr => {
      return {
        value: curr._id,
        label: curr.name,
      };
    }, []);
  }
);

const selectDevices = createSelector(
  props => props.devices,
  devices => {
    return _.map(devices, curr => {
      return {
        value: curr._id,
        label: curr.name,
      };
    }, []);
  }
);

export default {
  devicePaths: accessibleDevicePathsSelector,
  selectableDevices: selectableDevicesSelector,
  selectableCalculations: selectableCalculationsSelector,
};
export {
  selectDevices,
};
