const COLOR_VARIETIES = {
  grey: 'grey',
  green: 'green',
  yellow: 'yellow',
  red: 'red',
  blue: 'blue',
};

const DEFAULTS = {
  margin: '0',
  color: COLOR_VARIETIES.grey,
};

const CHIP_TYPES = {
  regular: 'regular',
  ghosted: 'ghosted',
};

// TODO put colors in the shared colors file, when it has been reworked
const CHIP_PRESETS = {
  [COLOR_VARIETIES.grey]: {
    [CHIP_TYPES.regular]: {
      background: '#ddd',
      text: '#222',
      button: '#666',
      buttonHover: '#333',
    },
    [CHIP_TYPES.ghosted]: {
      border: '#bbb',
      text: '#222',
      button: '#888',
      buttonHover: '#555',
    },
  },
  [COLOR_VARIETIES.green]: {
    [CHIP_TYPES.regular]: {
      background: '#3C7D44',
      text: '#fff',
      button: '#27522c',
      buttonHover: '#132916',
    },
    [CHIP_TYPES.ghosted]: {
      border: '#4D9F57',
      text: '#31783A',
      button: '#4D9F57',
      buttonHover: '#336b3a',
    },
  },
  [COLOR_VARIETIES.yellow]: {
    [CHIP_TYPES.regular]: {
      background: '#E1C14D',
      text: '#644E00',
      button: '#8f6f00',
      buttonHover: '#6b5300',
    },
    [CHIP_TYPES.ghosted]: {
      border: '#CEA40D',
      text: '#B88F00',
      button: '#CEA40D',
      buttonHover: '#997a0b',
    },
  },
  [COLOR_VARIETIES.red]: {
    [CHIP_TYPES.regular]: {
      background: '#D25E5E',
      text: '#fff',
      button: '#8a3d3d',
      buttonHover: '#522323',
    },
    [CHIP_TYPES.ghosted]: {
      border: '#D25E5E',
      text: '#BC2C2C',
      button: '#D25E5E',
      buttonHover: '#944444',
    },
  },
  [COLOR_VARIETIES.blue]: {
    [CHIP_TYPES.regular]: {
      background: '#428FD9',
      text: '#fff',
      button: '#2a659c',
      buttonHover: '#183f63',
    },
    [CHIP_TYPES.ghosted]: {
      border: '#428FD9',
      text: '#1668B7',
      button: '#428FD9',
      buttonHover: '#2c6294',
    },
  },
};

export {
  DEFAULTS,
  CHIP_TYPES,
  CHIP_PRESETS,
};
