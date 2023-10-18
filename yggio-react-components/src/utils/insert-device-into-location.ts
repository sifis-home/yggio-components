import _ from 'lodash';
import {Locations} from '../types';

interface Params {
  deviceId: string;
  locations: Locations;
  locationId: string;
  blueprintId: string;
}

const insertDeviceIntoLocation = ({
  deviceId,
  locations,
  locationId,
  blueprintId}: Params) => {
  const newItem = {
    deviceId,
    type: 'default',
    size: 'default',
  };
  const location = _.find(locations, {_id: locationId});
  if (!location) throw Error('DevErr: location not found');
  if (location.defaultLayer._id === blueprintId) {
    location.defaultLayer.items.push(newItem);
  } else {
    location.layers = _.map(location.layers, layer => {
      if (layer._id === blueprintId) {
        layer.items.push(newItem);
      }
      return layer;
    });
  }
  return location;
};

export default insertDeviceIntoLocation;
