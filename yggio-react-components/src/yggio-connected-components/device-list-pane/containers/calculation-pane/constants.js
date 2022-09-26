/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {CALCULATIONS_TYPES} from '../../../../constants';
import {createValueFields} from './utils';

const DEVICE_PATHS = {
  pm10: {
    label: 'Pm10',
    value: 'pm10',
    paths: createValueFields('pm10'),
  },
  // eslint-disable-next-line camelcase
  pm2_5: {
    label: 'Pm2_5',
    value: 'pm2_5',
    paths: createValueFields('pm2_5'),
  },
  pm1: {
    label: 'Pm1',
    value: 'pm1',
    paths: createValueFields('pm1'),
  },
  voc: {
    label: 'Voc',
    value: 'voc',
    paths: createValueFields('voc'),
  },
  co: {
    label: 'Co',
    value: 'co',
    paths: createValueFields('co'),
  },
  co2: {
    label: 'Co2',
    value: 'co2',
    paths: createValueFields('co2'),
  },
  currentVolume: {
    label: 'Current volume',
    value: 'currentVolume',
    paths: createValueFields('currentVolume'),
  },
  electricityConsumption: {
    label: 'Electricity consumption',
    value: 'electricityConsumption',
    paths: createValueFields('electricityConsumption'),
  },
  electricEnergy: {
    label: 'Electric energy',
    value: 'electricEnergy',
    paths: createValueFields('electricEnergy'),
  },
  counter: {
    label: 'Counter',
    value: 'counter',
    paths: createValueFields('counter'),
  },
  counterATotal: {
    label: 'Counter A total',
    value: 'counterATotal',
    paths: createValueFields('counterATotal'),
  },
  counterBTotal: {
    label: 'Counter B total',
    value: 'counterBTotal',
    paths: createValueFields('counterBTotal'),
  },
  counterB: {
    label: 'Counter B',
    value: 'counterB',
    paths: createValueFields('counterB'),
  },
  counterA: {
    label: 'Counter A',
    value: 'counterA',
    paths: createValueFields('counterA'),
  },
  countDetection: {
    label: 'Count detection',
    value: 'countDetection',
    paths: createValueFields('countDetection'),
  },
  presence: {
    label: 'Presence',
    value: 'presence',
    paths: createValueFields('presence'),
  },
  occupancy: {
    label: 'Occupancy',
    value: 'occupancy',
    paths: createValueFields('occupancy'),
  },
  motion: {
    label: 'Motion',
    value: 'motion',
    paths: createValueFields('motion'),
  },
  doorCounter: {
    label: 'Door counter',
    value: 'doorCounter',
    paths: createValueFields('doorCounter'),
  },
  door: {
    label: 'Door',
    value: 'door',
    paths: createValueFields('door'),
  },
  alarmCloseProximity: {
    label: 'Alarm close proximity',
    value: 'alarmCloseProximity',
    paths: createValueFields('alarmCloseProximity'),
  },
  alarmDoor: {
    label: 'Alarm door',
    value: 'alarmDoor',
    paths: createValueFields('alarmDoor'),
  },
  alarmFlood: {
    label: 'Alarm flood',
    value: 'alarmFlood',
    paths: createValueFields('alarmFlood'),
  },
  temperature: {
    label: 'Temperature',
    value: 'temperature',
    paths: _.concat(
      createValueFields('temperature0'),
      createValueFields('temperature1'),
      createValueFields('temperature'),
      createValueFields('averageTemperature'),
      createValueFields('temperatureAverage'),
    ),
  },
  peopleCounterOut: {
    label: 'People counter out',
    value: 'peopleCounterOut',
    paths: createValueFields('peopleCounter.out'),
  },
  peopleCounterIn: {
    label: 'People counter in',
    value: 'peopleCounterIn',
    paths: createValueFields('peopleCounter.in'),
  },
  peopleCounterTot: {
    label: 'People counter tot',
    value: 'peopleCounterTot',
    paths: createValueFields('peopleCounter.tot'),
  }
};

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
  DEVICE_PATHS,
  CALCULATIONS,
  GROUP_TYPES,
  CALCULATION_PRESETS,
  CALCULATION_SETTINGS,
  CALCULATION_DESCRIPTIONS,
  STEPS,
  CALCULATION_AUTOMATIC_UPDATE_TYPES,
};
