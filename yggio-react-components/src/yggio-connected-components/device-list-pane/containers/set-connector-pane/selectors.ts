import _ from 'lodash';
import {createSelector} from 'reselect';

import {Devices} from '../../../../types';

const selectDeviceOptions = createSelector(
  (props: {devices: Devices}) => props.devices,
  (devices: Devices) => _.map(devices, device => ({
    value: device._id,
    label: device.name || 'no-name',
  }))
);

export {
  selectDeviceOptions,
};
