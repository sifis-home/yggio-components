/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {
  format,
  getUnixTime,
  parseISO,
} from 'date-fns';
import {UseQueryResult} from '@tanstack/react-query';

import {FormInputs} from '../../types';
import {
  resolveNumDecimals,
  isFormValid,
  generateTicks,
} from './utils';
import {
  Data,
  FormattedData,
  DataSerie,
  Attributes,
  ChartEntry,
  LegendEntry,
  YAxisDomain,
} from './types';
import {
  TIME_PERIODS,
  TIME_PERIOD_TYPES,
  RESOLUTIONS,
  COLORS,
  RANGES
} from './constants';

const selectDataSeries = (
  statsQueries: UseQueryResult<Data, unknown>[],
  chartEntries: ChartEntry[],
): DataSerie[] | null => {
  if (_.some(statsQueries, query => !query.isSuccess)) {
    return null;
  }
  const dataSeries = _.map(statsQueries, (query, index) => {
    const data = query.data || [];
    const formattedData = formatData(data);
    const entry = chartEntries[index];
    const serie: DataSerie = {
      deviceName: entry.deviceName,
      deviceId: entry.deviceId,
      field: entry.field,
      data: formattedData,
      axis: entry.axis,
      color: COLORS[index % COLORS.length],
    };
    return serie;
  });
  return dataSeries;
};

const formatData = (data: Data): FormattedData => {
  const numDecimals = resolveNumDecimals(data);
  const roundMultiplier = 10 ** numDecimals;
  const formattedData = _.map(data, point => {
    const roundedValue = Math.round(point.value * roundMultiplier) / roundMultiplier;
    return {
      value: point.value,
      unixTime: getUnixTime(parseISO(point.time)),
      formattedTime: format(parseISO(point.time), 'yyyy-MM-dd HH:mm:ss'),
      roundedValue: roundedValue.toFixed(numDecimals),
    };
  });
  return formattedData;
};

const selectAttributes = (formInputs: FormInputs): Attributes | null => {
  if (!isFormValid(formInputs)) {
    return null;
  }

  const selectedTimePeriod = formInputs.timePeriod.value as TIME_PERIOD_TYPES | 'custom';
  const range = formInputs.range.value as string;

  let yAxisDomain: YAxisDomain = [0, 'auto'];
  if (range === RANGES.auto) {
    yAxisDomain = ['auto', 'auto'];
  }

  let attributes;
  if (selectedTimePeriod === 'custom') {
    attributes = getAttributesFromCustomTimePeriod(formInputs, yAxisDomain);
  } else {
    attributes = getAttributesFromPredefinedTimePeriod(formInputs, yAxisDomain);
  }

  return attributes;
};

const getAttributesFromCustomTimePeriod = (
  formInputs: FormInputs,
  yAxisDomain: YAxisDomain,
): Attributes => {
  const customFromTime = formInputs.customFromTime.value as string;
  const customToTime = formInputs.customToTime.value as string;
  const selectedResolution = formInputs.resolution.value as RESOLUTIONS;

  const fromTimeUnix = getUnixTime(new Date(customFromTime));
  const toTimeUnix = getUnixTime(new Date(customToTime));

  const duration = toTimeUnix - fromTimeUnix;

  let distance = null;
  if (selectedResolution === RESOLUTIONS.low) {
    distance = Math.floor(duration / 100);
  }
  if (selectedResolution === RESOLUTIONS.high) {
    distance = Math.floor(duration / 500);
  }

  return {
    timeFormat: 'yyyy-MM-dd HH:mm',
    startTime: fromTimeUnix,
    endTime: toTimeUnix,
    ticks: [],
    distance,
    xAxisDomain: [fromTimeUnix, toTimeUnix],
    yAxisDomain,
  };
};

const getAttributesFromPredefinedTimePeriod = (
  formInputs: FormInputs,
  yAxisDomain: YAxisDomain,
): Attributes => {

  const selectedTimePeriod = formInputs.timePeriod.value as TIME_PERIOD_TYPES;
  const selectedResolution = formInputs.resolution.value as RESOLUTIONS;

  const timePeriod = TIME_PERIODS[selectedTimePeriod];

  // Round end time to lower number of queries and rerenders
  const nowUnix = Math.round(Date.now() / 1000);
  const endTime = nowUnix - (nowUnix % (60 * 1));

  const ticks = generateTicks(timePeriod.tickSettings, endTime);

  let distance = null;
  if (selectedResolution === RESOLUTIONS.low) {
    distance = timePeriod.resolutions.low;
  }
  if (selectedResolution === RESOLUTIONS.high) {
    distance = timePeriod.resolutions.high;
  }

  return {
    timeFormat: timePeriod.timeFormat,
    startTime: endTime - timePeriod.duration,
    endTime,
    ticks,
    distance,
    xAxisDomain: [endTime - timePeriod.duration, endTime],
    yAxisDomain,
  };
};

const selectLegendEntries = (dataSeries: DataSerie[] | null): LegendEntry[] => {
  const entries = _.map(dataSeries, serie => {
    const entry: LegendEntry = {
      deviceId: serie.deviceId,
      deviceName: serie.deviceName,
      field: serie.field,
      axis: serie.axis,
      isDataEmpty: !serie.data.length,
      color: serie.color,
    };
    return entry;
  });
  return entries;
};

export {
  selectDataSeries,
  selectAttributes,
  selectLegendEntries,
};
