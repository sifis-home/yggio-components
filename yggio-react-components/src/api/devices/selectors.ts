import _ from 'lodash';
import {Devices, Device, IdKeyedDevices} from '../../types';

const selectDevicesData = (data: Devices) => (
  _.reduce(data, (acc: IdKeyedDevices, curr: Device) => {
    const i = curr._id;
    acc[i] = curr;
    return acc;
  }, {})
);

export {
  selectDevicesData,
};
