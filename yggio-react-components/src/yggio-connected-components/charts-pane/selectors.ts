import _ from 'lodash';
import {UseQueryResult} from '@tanstack/react-query';
import queryString from 'query-string';

import {Field, AvailableFields} from './types';
import {Devices, InputOptions} from '../../types';

const NO_NAME = 'no-name';

const deviceIdsInUrlSelector = () => {
  const parsed = queryString.parse(window.location.search, {arrayFormat: 'comma'});
  const devicesParam = parsed.devices;
  let devices: string[] = [];
  if (_.isArray(devicesParam)) {
    devices = devicesParam;
  } else if (devicesParam) {
    devices = [devicesParam];
  }
  return devices;
};

const devicesSelector = (data: unknown) => {
  return _.map(data as [], device => _.pick(device, ['_id', 'name']));
};

const addDeviceOptionsSelector = (addedDevices: Devices, devices?: Devices) => {
  const addedDevicesIds = _.map(addedDevices, 'id');
  const notYetAddedDevices = _.filter(devices, device => {
    return !_.includes(addedDevicesIds, device._id);
  });
  return _.map(notYetAddedDevices, device => ({
    value: device._id,
    label: device.name || NO_NAME,
  }));
};

const availableFieldsSelector = (
  addedDevies: Devices,
  fieldsQueries: UseQueryResult<unknown, unknown>[],
) => {
  const acc: AvailableFields = {};
  const fields = _.reduce(fieldsQueries, (result, query, index) => {
    const res = query.data as string[];
    if (res) {
      _.each(res, field => {
        const old = result[field] || [];
        result[field] = [...old, addedDevies[index]._id];
      });
    }
    return result;
  }, acc);
  return fields;
};

const fieldOptionsSelector = (addedFields: Field[], availableFields: AvailableFields) => {
  const addedFieldNames = _.map(addedFields, 'name');
  const acc: InputOptions = [];
  const options = _.reduce(availableFields, (result, deviceIds, field) => {
    if (!addedFieldNames.includes(field)) {
      acc.push({
        label: `${field} (${deviceIds.length})`,
        value: field,
      });
    }
    return result;
  }, acc);
  return options;
};

interface ChartEntry {
  deviceId: string;
  deviceName: string;
  field: string;
  axis: 'left' | 'right';
}

const chartEntriesSelector = (
  addedFields: Field[],
  availableFields: AvailableFields,
  devices?: Devices,
) => {
  const acc: ChartEntry[] = [];
  const entries = _.reduce(addedFields, (result, field) => {
    _.each(availableFields[field.name], deviceId => {
      const device = _.find(devices, ['_id', deviceId]);
      if (device) {
        result.push({
          deviceId,
          deviceName: device.name || NO_NAME,
          field: field.name,
          axis: 'left',
        });
      }
    });
    return result;
  }, acc);

  return entries;
};

export {
  deviceIdsInUrlSelector,
  devicesSelector,
  addDeviceOptionsSelector,
  availableFieldsSelector,
  fieldOptionsSelector,
  chartEntriesSelector,
};
