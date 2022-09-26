/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
// button/constants.ts

const SIZES = {
  small: 'small',
  medium: 'medium',
  large: 'large',
  full: 'full',
  fit: 'fit',
};
const DEFAULT_SIZE = SIZES.medium;

const WIDTHS = {
  small: '50px',
  medium: '100px',
  large: '150px',
  full: '100%',
  fit: 'none',
};
const DEFAULT_WIDTH = WIDTHS[DEFAULT_SIZE];

const HEIGHTS = {
  small: '25px',
  medium: '34px',
  large: '40px',
  full: '34px',
  fit: '34px',
};
const DEFAULT_HEIGHT = HEIGHTS[DEFAULT_SIZE];

const COLOR_VARIETIES = {
  grey: 'grey',
  green: 'green',
  yellow: 'yellow',
  red: 'red',
  blue: 'blue',
  darkBlue: 'darkBlue',
};

const BUTTON_TYPES = {
  regular: 'regular',
  ghosted: 'ghosted',
};

// TODO put colors in the shared colors file, when it has been reworked
const BUTTON_PRESETS = {
  [COLOR_VARIETIES.grey]: {
    [BUTTON_TYPES.regular]: {
      background: '#ddd',
      hoverBackground: '#ccc',
      text: '#333',
    },
    [BUTTON_TYPES.ghosted]: {
      border: '#bbb',
      hoverBackground: '#F8F8F8',
      text: '#333',
    },
  },
  [COLOR_VARIETIES.green]: {
    [BUTTON_TYPES.regular]: {
      background: '#3C7D44',
      hoverBackground: '#306A37',
      text: '#fff',
    },
    [BUTTON_TYPES.ghosted]: {
      border: '#4D9F57',
      hoverBackground: '#FAFFFA',
      text: '#31783A',
    },
  },
  [COLOR_VARIETIES.yellow]: {
    [BUTTON_TYPES.regular]: {
      background: '#E1C14D',
      hoverBackground: '#D3AE29',
      text: '#644E00',
    },
    [BUTTON_TYPES.ghosted]: {
      border: '#CEA40D',
      hoverBackground: '#FFFCF3',
      text: '#B88F00',
    },
  },
  [COLOR_VARIETIES.red]: {
    [BUTTON_TYPES.regular]: {
      background: '#D25E5E',
      hoverBackground: '#C04848',
      text: '#fff',
    },
    [BUTTON_TYPES.ghosted]: {
      border: '#D25E5E',
      hoverBackground: '#FEF7F7',
      text: '#BC2C2C',
    },
  },
  [COLOR_VARIETIES.blue]: {
    [BUTTON_TYPES.regular]: {
      background: '#428FD9',
      hoverBackground: '#2E7AC2',
      text: '#fff',
    },
    [BUTTON_TYPES.ghosted]: {
      border: '#428FD9',
      hoverBackground: '#F6F8FB',
      text: '#1668B7',
    },
  },
  [COLOR_VARIETIES.darkBlue]: {
    [BUTTON_TYPES.regular]: {
      background: '#203672',
      hoverBackground: '#0d3251',
      text: '#fff',
    },
    [BUTTON_TYPES.ghosted]: {
      border: '#203672',
      hoverBackground: '#0d3251',
      text: '#1668B7',
    },
  },
};

const DEFAULT_PRESET = BUTTON_PRESETS[COLOR_VARIETIES.grey];

const DEFAULT_ICON_SIZE = 20;

const DISABLED_PRESETS = {
  [BUTTON_TYPES.regular]: {
    background: '#eee',
    text: '#999',
  },
  [BUTTON_TYPES.ghosted]: {
    border: '#ccc',
    text: '#aaa',
  }
};

const DEFAULT_TOOLTIP_PLACEMENT = 'top';

export {
  SIZES,
  DEFAULT_SIZE,
  WIDTHS,
  DEFAULT_WIDTH,
  HEIGHTS,
  DEFAULT_HEIGHT,
  BUTTON_TYPES,
  BUTTON_PRESETS,
  DEFAULT_PRESET,
  DEFAULT_ICON_SIZE,
  DISABLED_PRESETS,
  DEFAULT_TOOLTIP_PLACEMENT,
};
