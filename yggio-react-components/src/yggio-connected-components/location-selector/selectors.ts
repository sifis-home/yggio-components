/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
