/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

interface DataSerie {
  deviceName: string;
  deviceId: string;
  field: string;
  axis: 'left' | 'right';
  data: FormattedData;
  color: string;
}

interface DataPoint {
  time: string;
  value: number;
}

type Data = DataPoint[];

interface FormattedDataPoint {
  value: number;
  unixTime: number;
  formattedTime: string;
  roundedValue: string;
}

type FormattedData = FormattedDataPoint[];

type Attributes = {
  timeFormat: string;
  startTime: number;
  endTime: number;
  ticks: number[];
  distance: number | null;
  yAxisDomain: [number | string, number | string];
  xAxisDomain: [number | string, number | string];
};

interface TickSettings {
  getLastTick: (nowUnix: number) => number;
  numTicks: number;
  distance: number;
}

interface TimePeriod {
  name: string;
  timeFormat: string;
  duration: number;
  endTime?: number;
  tickSettings: TickSettings;
  resolutions: {
    low: number;
    high: number;
  };
}

interface ChartEntry {
  deviceId: string;
  deviceName: string;
  field: string;
  axis: 'left' | 'right';
}

interface LegendEntry {
  deviceId: string;
  deviceName: string;
  field: string;
  axis: 'left' | 'right';
  isDataEmpty: boolean;
  color: string;
}

type YAxisDomain = [number | string, number | string];

export type {
  Data,
  DataSerie,
  FormattedDataPoint,
  FormattedData,
  Attributes,
  TickSettings,
  TimePeriod,
  ChartEntry,
  LegendEntry,
  YAxisDomain,
};
