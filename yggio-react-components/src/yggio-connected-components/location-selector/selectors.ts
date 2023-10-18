import _ from 'lodash';

import {Locations} from '../../types';

const selectLocationOptions = (locations?: Locations) => {
  return _.map(locations, location => ({
    value: location._id,
    label: location.name,
  }));
};

const selectBlueprintOptions = (selectedLocationId?: string, locations?: Locations) => {
  if (!locations || !selectedLocationId) return [];
  const location = _.find(locations, {_id: selectedLocationId});
  if (!location) return [];
  const bluepints = [location.defaultLayer, ...location.layers];
  return _.map(bluepints, blueprint => ({
    value: blueprint._id,
    label: blueprint.name || 'Your Blueprint',
  }));
};

export {
  selectLocationOptions,
  selectBlueprintOptions,
};
