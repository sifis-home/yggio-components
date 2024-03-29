﻿/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {
  MAP,
} from '../../constants';

const getBounds = items => {
  const bounds = _.map(items, item => {
    if (item.latlng) {
      return item.latlng;
    }
    if (item.lat && item.lng) {
      return [item.lat, item.lng];
    }
  });
  if (!_.size(bounds)) {
    return _.uniq([MAP.defaultCenter]);
  }
  return _.uniq(_.compact(bounds));
};

const sanitizeItems = items => {
  const sanitizedItems = _.filter(items, item => {
    if (item.latlng && _.isArray(item.latlng) && _.size(item.latlng) === 2) {
      const [lat, lng] = item.latlng;
      if (_.isFinite(lat) && _.isFinite(lng)) {
        return item;
      }
    }
    if (_.isFinite(item.lat) && _.isFinite(item.lng)) {
      return item;
    }
  });
  return sanitizedItems;
};

export {
  getBounds,
  sanitizeItems,
};
