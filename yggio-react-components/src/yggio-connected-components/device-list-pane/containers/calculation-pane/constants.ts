/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {CALCULATIONS_TYPES} from '../../../../constants';

const CALCULATIONS = {
  average: 'average',
  averageAccumulation: 'average,accumulation',
  accumulation: 'accumulation',
  accumulationAccumulation: 'accumulation,accumulation',
  lastAccumulation: 'last,accumulation',
  lastAverage: 'last,average',
  lastMax: 'last,max',
  lastMin: 'last,min',
  differenceTotal: 'differenceTotal',
  difference: 'difference',
};

const GROUP_TYPES = {
  series: {
    type: 'series',
  },
  time: {
    type: 'time',
  },
  imd: {
    type: 'series',
    time: '1mo'
  },
};

const CALCULATION_PRESETS = [
  {
    value: 'a',
    label: 'Sum of last values',
  },
  {
    value: 'b',
    label: 'Average of last values',
  },
  {
    value: 'c',
    label: 'Maximum of last values',
  },
  {
    value: 'd',
    label: 'Minimum of last values',
  },
  {
    value: 'e',
    label: 'Average of each node',
  },
  {
    value: 'f',
    label: 'Sum of each node',
  },
  {
    value: 'g',
    label: 'Aggregated value over time',
  },
  {
    value: 'h',
    label: 'Aggregated average value over time (average of sum)',
  },
  {
    value: 'i',
    label: 'Monthly sum per each node',
  },
  {
    value: 'j',
    label: 'Total monthly sum',
  },
  {
    value: 'k',
    label: 'Monthly difference from total on each node',
  },
  {
    value: 'l',
    label: 'Monthly difference from total grouped',
  },
];

const CALCULATION_SETTINGS = {
  a: {
    type: CALCULATIONS_TYPES.sumLastValues,
    preset: {
      calcType: {
        groupingCalcs: CALCULATIONS.lastAccumulation.split(','),
      }
    }
  },
  b: {
    type: CALCULATIONS_TYPES.averageLastValues,
    preset: {
      calcType: {
        groupingCalcs: CALCULATIONS.lastAverage.split(','),
      },
    }
  },
  c: {
    type: CALCULATIONS_TYPES.maxLastValues,
    preset: {
      calcType: {
        groupingCalcs: CALCULATIONS.lastMax.split(','),
      },
    }
  },
  d: {
    type: CALCULATIONS_TYPES.minLastValues,
    preset: {
      calcType: {
        groupingCalcs: CALCULATIONS.lastMin.split(','),
      },
    }
  },
  e: {
    type: CALCULATIONS_TYPES.averageEachNode,
    preset: {
      calcType: {
        groupingCalcs: CALCULATIONS.average.split(','),
      },
    }
  },
  f: {
    type: CALCULATIONS_TYPES.sumEachNode,
    preset: {
      calcType: {
        groupingCalcs: CALCULATIONS.accumulation.split(','),
      },
    }
  },
  g: {
    type: CALCULATIONS_TYPES.aggregatedValueOverTime,
    preset: {
      calcType: {
        groupingCalcs: CALCULATIONS.accumulationAccumulation.split(','),
      },
    }
  },
  h: {
    type: CALCULATIONS_TYPES.averageAggregatedValueOverTime,
    preset: {
      calcType: {
        groupingCalcs: CALCULATIONS.averageAccumulation.split(','),
      },
    }
  },
  i: {
    type: CALCULATIONS_TYPES.monthlySumPerEachNode,
    preset: {
      calcType: {
        grouping: {
          type: 'series',
          time: '1mo'
        },
        groupingCalcs: CALCULATIONS.accumulation.split(','),
      },
    }
  },
  j: {
    type: CALCULATIONS_TYPES.totalMonthlySum,
    preset: {
      calcType: {
        grouping: {
          type: 'series',
          time: '1mo'
        },
        groupingCalcs: CALCULATIONS.accumulationAccumulation.split(','),
      },
      interval: {
        from: new Date(0).toISOString(),
        to: new Date().toISOString()
      }
    }
  },
  k: {
    type: CALCULATIONS_TYPES.monthlyDiffFromTotalEachNode,
    preset: {
      calcType: {
        grouping: {
          type: 'series',
          time: '1mo'
        },
        groupingCalcs: CALCULATIONS.differenceTotal.split(','),
      },
      interval: {
        from: new Date(0).toISOString(),
        to: new Date().toISOString()
      }
    }
  },
  l: {
    type: CALCULATIONS_TYPES.monthlyDiffFromTotal,
    preset: {
      calcType: {
        grouping: {
          type: 'series',
          time: '1mo',
          fn: 'last'
        },
        groupingCalcs: CALCULATIONS.difference.split(','),
      },
      interval: {
        from: new Date(0).toISOString(),
        to: new Date().toISOString()
      }
    }
  },
};

const CALCULATION_DESCRIPTIONS = {
  a: 'This setting will calculate the sum of your last reported values',
  b: 'This setting will calculate the average value of your last reported values',
  c: 'This setting will calculate the maximum value of your last reported values',
  d: 'This setting will calculate the minimum value of your last reported values',
  e: 'This setting will calculate average value of each device selected',
  f: 'This setting will calculate sum value of each device selected',
  g: 'This setting will calculate the aggregated value over time',
  h: 'This setting will calculate the average value of the aggregated values over time',
  i: 'This setting will calculate the monthly sum for each device selected',
  j: 'This setting will calculate the total monthly sum',
  k: 'This setting will calculate the monthly difference from total value on each device',
  l: 'This setting will calculate the monthly difference from total value of all devices',
};

const STEPS = {
  calculationName: {
    name: 'calculationName',
    progressBarTitle: 'DESCRIPTION',
  },
  calculationSource: {
    name: 'calculationSource',
    progressBarTitle: 'SOURCE',
  },
  calculationSetting: {
    name: 'calculationSetting',
    progressBarTitle: 'SETTING',
  },
  calculationInterval: {
    name: 'calculationInterval',
    progressBarTitle: 'INTERVAL'
  },
  calculationDevice: {
    name: 'calculationDevice',
    progressBarTitle: 'DEVICE',
  },
};

const CALCULATION_AUTOMATIC_UPDATE_TYPES = {
  event: 'event',
  periodic: 'periodic',
};

export {
  CALCULATIONS,
  GROUP_TYPES,
  CALCULATION_PRESETS,
  CALCULATION_SETTINGS,
  CALCULATION_DESCRIPTIONS,
  STEPS,
  CALCULATION_AUTOMATIC_UPDATE_TYPES,
};
