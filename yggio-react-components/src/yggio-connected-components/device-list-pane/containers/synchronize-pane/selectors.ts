import _ from 'lodash';
import {createSelector} from 'reselect';

import {Devices} from '../../../../types';

const selectIsSynchronizable = createSelector(
  ({devices}: {devices: Devices}) => devices,
  ({deviceIds}: {deviceIds: string[]}) => deviceIds,
  (devices, deviceIds) => {
    const validDevices = _.filter(devices, device => _.includes(deviceIds, device._id));
    const downlinkQueueDevices = _.filter(validDevices, 'downlinkQueue');
    const connectorDevices = _.filter(validDevices, 'connector');
    const merged = [...downlinkQueueDevices, ...connectorDevices];
    return !_.isEmpty(merged);
  }
);

export {
  selectIsSynchronizable,
};
