/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
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
