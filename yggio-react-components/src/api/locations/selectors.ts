/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {Locations, Location, IdKeyedLocations} from '../../types';

const selectLocationsData = (data: Locations) => (
  _.reduce(data, (acc: IdKeyedLocations, curr: Location) => {
    const i = curr._id;
    acc[i] = curr;
    return acc;
  }, {})
);

export {
  selectLocationsData,
};
