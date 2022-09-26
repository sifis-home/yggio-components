/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {
  getUnixTime,
  startOfHour,
  startOfDay,
  startOfWeek,
} from 'date-fns';

import {TimePeriod} from './types';

enum TIME_PERIOD_TYPES {
  hour = 'hour',
  day = 'day',
  week = 'week',
  month = 'month',
}

enum RESOLUTIONS {
  low = 'Low',
  high = 'High',
  full = 'Full',
}

enum RANGES {
  auto = 'Auto',
  fromZero = 'From zero',
}

const INTERPOLATION_OPTIONS = {
  linear: {value: 'linear', label: 'Linear'},
  smooth: {value: 'monotone', label: 'Smooth'},
  step: {value: 'stepBefore', label: 'Step'},
};

const ONE_MINUTE = 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_WEEK = ONE_DAY * 7;
const ONE_MONTH = ONE_WEEK * 4;

const startOfCurrentQuarterHour = (nowUnix: number) => (nowUnix - nowUnix) % (ONE_MINUTE * 15);
const startOfCurrentHour = (nowUnix: number) => getUnixTime(startOfHour(nowUnix * 1000));
const startOfCurrentDay = (nowUnix: number) => getUnixTime(startOfDay(nowUnix * 1000));
const startOfCurrentWeek = (nowUnix: number) => getUnixTime(startOfWeek(nowUnix * 1000));

const TIME_PERIODS: Record<TIME_PERIOD_TYPES, TimePeriod> = {
  [TIME_PERIOD_TYPES.hour]: {
    name: 'Last 60 minutes',
    timeFormat: 'HH:mm',
    duration: ONE_HOUR,
    tickSettings: {
      getLastTick: startOfCurrentQuarterHour,
      numTicks: 4,
      distance: ONE_MINUTE * 15,
    },
    resolutions: {
      low: ONE_MINUTE, // => 60 points
      high: 5, // => 720 points
    },
  },
  [TIME_PERIOD_TYPES.day]: {
    name: 'Last 24 hours',
    timeFormat: 'HH:mm',
    duration: ONE_DAY,
    tickSettings: {
      getLastTick: startOfCurrentHour,
      numTicks: 4,
      distance: ONE_HOUR * 6,
    },
    resolutions: {
      low: ONE_MINUTE * 15, // => 96 points
      high: ONE_MINUTE * 2, // => 720 points
    },
  },
  [TIME_PERIOD_TYPES.week]: {
    name: 'Last 7 days',
    timeFormat: 'EEE',
    duration: ONE_WEEK,
    tickSettings: {
      getLastTick: startOfCurrentDay,
      numTicks: 7,
      distance: ONE_DAY,
    },
    resolutions: {
      low: ONE_HOUR * 2, // => 84 points
      high: ONE_MINUTE * 10, // => 1008 points
    },
  },
  [TIME_PERIOD_TYPES.month]: {
    name: 'Last 30 days',
    timeFormat: 'dd/MM',
    duration: ONE_MONTH,
    tickSettings: {
      getLastTick: startOfCurrentWeek,
      numTicks: 6,
      distance: ONE_DAY * 6,
    },
    resolutions: {
      low: ONE_HOUR * 8, // => 90 points
      high: ONE_HOUR, // => 720 points
    },
  },
};

const COLORS = [
  '#0989D1', // blue
  '#00A441', // green
  '#DD8500', // orange
  '#A838FF', // purple
  '#DD0050', // pink
  '#00CCC0', // teal
  '#88B800', // lime
  '#D6C000', // yellow
];

export {
  TIME_PERIOD_TYPES,
  TIME_PERIODS,
  RESOLUTIONS,
  INTERPOLATION_OPTIONS,
  RANGES,
  COLORS,
};
