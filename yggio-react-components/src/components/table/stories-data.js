/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// stories-data.js

import {COLORS} from '../../constants';

const customStyle = {
  itemBg: COLORS.greyDark,
  color: COLORS.black,
  background: COLORS.white,
};

const items = [
  {
    _id: 1,
    name: 'House in berlin',
    type: 'LORA',
    value: 'Temperature: 25C',
    'nodeInfo-commandClasses-0x0025': '0x0025',
    devices: 1,
    active: new Date('2008'),
    url: '/locations/1',
  },
  {
    _id: 2,
    name: 'Building in new york',
    type: 'Z-WAVE',
    value: 'Humidity: alot',
    action: {type: 'input'},
    devices: 2,
    active: new Date('2019'),
    url: '/locations/2',
  },
  {
    _id: 3,
    name: 'Tent in ohio',
    type: 'LORA',
    value: 'Pain: pain',
    action: 'ACTION',
    devices: 3,
    active: new Date(),
    url: '/locations/3',
  },
];

const edgeItems = [
  {
    _id: 1,
    name: 'House in berlin',
    description: 'This is a text that might be very long. Some sort of description, something else that might overflow the space given. Maybe shorten to "..."?',
    devices: 100
  }
];


export {
  customStyle,
  items,
  edgeItems,
};
