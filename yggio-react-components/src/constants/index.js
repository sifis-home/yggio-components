export * from './colors';
export * from './resource-scopes';
export * from './resource-types';
export * from './errors';
export * from './separators';
export * from './map';
export * from './measurements';
export * from './status-types';
export * from './device-types';
export * from './http-methods';
export * from './external-app-urls';
export * from './default-delta-controls-settings';
export * from './env-constants';
export * from './access-constants';
export * from './web-constants';
export * from './organization';
export * from './views';

const RULES_ACTIONS = {
  turnOn: 'On',
  turnOff: 'Off',
  percentage100: '100%',
  percentage75: '75%',
  percentage50: '50%',
  percentage25: '25%',
  percentage0: '0%',
  up: 'Up',
  down: 'Down',
  open: 'Open',
  close: 'Close',
  custom: 'Custom',
};

const CALCULATIONS_TYPES = {
  sumLastValues: 'sumLastValues',
  averageLastValues: 'averageLastValues',
  maxLastValues: 'maxLastValues',
  minLastValues: 'minLastValues',
  averageEachNode: 'averageEachNode',
  sumEachNode: 'sumEachNode',
  totalMonthlySum: 'totalMonthlySum',
  aggregatedValueOverTime: 'aggregatedValueOverTime',
  averageAggregatedValueOverTime: 'averageAggregatedValueOverTime',
  monthlySumPerEachNode: 'monthlySumPerEachNode',
  monthlyDiffFromTotalEachNode: 'monthlyDiffFromTotalEachNode',
  monthlyDiffFromTotal: 'monthlyDiffFromTotal',
};

const CALCULATION_NAMES = {
  a: 'Sum of last values',
  b: 'Average of last values',
  c: 'Maximum of last values',
  d: 'Minimum of last values',
  e: 'Average of each node',
  f: 'Sum of each node',
  g: 'Aggregated value over time',
  h: 'Average of sum',
  i: 'Monthly sum per each node',
  j: 'Total monthly sum',
  k: 'Monthly difference from total on each node',
  l: 'Monthly difference from total grouped',
};

export {
  CALCULATIONS_TYPES,
  CALCULATION_NAMES,
  RULES_ACTIONS,
};
