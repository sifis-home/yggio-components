import _ from 'lodash';
import {UseQueryResult} from '@tanstack/react-query';
import flatten from 'flat';
import {createSelector} from 'reselect';

import {Devices, Device, Calculations, InputOptions} from '../../../../types';

const selectDevicePaths = createSelector(
  (props: {selectedDevices: string[]}) => props.selectedDevices,
  (props: {devices: Devices}) => props.devices,
  (props: {fields: UseQueryResult<unknown, unknown>[]}) => props.fields,
  (selectedDevicesIds, devices, fields) => {
    const flattenedFields = _.flatMap(fields, 'data');
    const dataFields = _.union(flattenedFields);
    const selectedDevices = _.filter(devices, device => _.includes(selectedDevicesIds, device._id));
    const init: InputOptions = [];
    const obtainableDevicePaths = _.reduce(selectedDevices, (acc, curr) => {
      const handleFieldKeys = (field: string) => curr.secret
        ? _.replace(field, 'value_', '')
        : field;
      const fieldKeys = _.map<string, string>(dataFields, handleFieldKeys);

      const handleDeviceKeys = (key: Device) => _.keys(flatten(key, {delimiter: '_'}));
      const deviceKeys = (arr: Devices) => _.map(arr, handleDeviceKeys);

      const deviceFields = _.flow([
        deviceKeys,
        _.flatten,
        _.uniq,
      ])(devices) as string[];

      const fields = _.intersection<string>(fieldKeys, deviceFields);
      const selectableFields = _.map(fields, field => ({label: field, value: field}));
      acc = _.uniqBy([...acc, ...selectableFields], res => res.value);
      return acc;
    }, init);
    return _.uniq(obtainableDevicePaths);
  }
);

const selectableDevicesSelector = createSelector(
  (props: {devices: Devices}) => props.devices,
  devices => {
    return _.map(devices, curr => {
      return {
        value: curr._id,
        label: curr.name,
      };
    });
  }
);

const selectableCalculationsSelector = createSelector(
  (props: {calculations: Calculations}) => props.calculations,
  calculations => {
    return _.map(calculations, curr => {
      return {
        value: curr._id,
        label: curr.name,
      };
    });
  }
);

const selectDevices = createSelector(
  (props: {devices: Devices}) => props.devices,
  devices => {
    return _.map(devices, curr => {
      return {
        value: curr._id,
        label: curr.name,
      };
    });
  }
);

export default {
  selectableDevices: selectableDevicesSelector,
  selectableCalculations: selectableCalculationsSelector,
};
export {
  selectDevicePaths,
  selectDevices,
};
