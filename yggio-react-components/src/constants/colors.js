/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
const BASE_COLORS = {
  greenRacing: '#004225',
  greenAlt: '#3C7D44',
  greenLightAlt: '#53d989',
  greenLight: '#55c977',
  greenMedium: '#49AE68',
  greenDark: '#004C19',
  greenMatt: '#81A897',

  red: '#ff3c3c',
  redAlt: '#ff282d',
  redDark: '#BC5252',

  yellow: '#CEBE2E',

  black: '#111',

  greyDark: '#333',
  greyDarkAlt: '#555',
  greyMedium: '#888',
  grey: '#ccc',
  grey2: '#bbb',
  greyAlt: '#ddd',
  greyLight: '#eee',
  greyLightAlt: '#f5f5f5',
  greyTransparent: 'rgba(50, 50, 50, 0.4)',

  white: '#fbfbfb',
  trueWhite: '#fff',

  blueLight: '#3eb6e6',

  transparent: 'transparent',
};

// Component specific colors
const COMPONENT_COLORS = {
  marker: '#5ac42b',
};
const COLORS = {...BASE_COLORS, ...COMPONENT_COLORS};

export default COLORS;
