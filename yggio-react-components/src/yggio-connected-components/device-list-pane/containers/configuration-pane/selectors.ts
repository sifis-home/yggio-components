import _ from 'lodash';
import {createSelector} from 'reselect';
import {IdKeyedDevices, Devices} from '../../../../types';

const selectConfigurableDevices = createSelector(
  (props: {devices: Devices}) => props.devices,
  (props: {selectedDevices: string[]}) => props.selectedDevices,
  (devices: Devices, selectedDevices: string[]) => (
    _.reduce(selectedDevices, (acc: IdKeyedDevices, curr: string) => {
      const idKeyedDevices = _.keyBy(devices, '_id');
      const device = idKeyedDevices[curr];
      acc[curr] = device;
      return acc;
    }, {})
  )
);

export {
  selectConfigurableDevices,
};
