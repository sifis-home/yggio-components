const BASE_COLORS = {
  greenRacing: '#004225',
  greenAlt: '#3C7D44',
  greenLightAlt: '#53d989',
  greenLight: '#55c977',
  greenMedium: '#49AE68',
  greenDark: '#004C19',
  greenMatt: '#81A897',
  green: 'green',

  red: '#ff3c3c',
  redLight: '#ff7171',
  redAlt: '#ff282d',
  redDark: '#BC5252',

  yellow: '#CEBE2E',
  yellowLight: '#fff177',

  black: '#111',

  greyDark: '#333',
  greyDarkAlt: '#555',
  greyMedium: '#888',
  greyMedium2: '#777',
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

const THRESHOLD_COLORS = {
  grafanaGreen: '#31a82d',
  grafanaRed: '#e03435',
  grafanaYellow: '#d77728',
  grafanaBlue: '#3373d9',
};
const COLORS = {
  ...BASE_COLORS,
  ...COMPONENT_COLORS,
  ...THRESHOLD_COLORS,
};

export {
  COLORS,
};
