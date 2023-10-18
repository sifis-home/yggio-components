import _ from 'lodash';
import {Location} from '../../../types';

const selectLocationBlueprintPairs = (deviceId: string, locations?: Location[]) => {
  const acc: {location: string, blueprint: string}[] = [];
  const pairs = _.reduce(locations, (result, location) => {
    const allBlueprints = [location.defaultLayer, ...location.layers];
    const filteredBlueprints = _.filter(allBlueprints, blueprint => {
      const hasDevice = _.some(blueprint.items, item => item.deviceId === deviceId);
      return hasDevice;
    });
    const newPairs = _.map(filteredBlueprints, blueprint => ({
      location: location.name,
      blueprint: blueprint.name || 'Your Blueprint',
    }));
    result = [...result, ...newPairs];
    return result;
  }, acc);
  return pairs;
};

export {
  selectLocationBlueprintPairs,
};
