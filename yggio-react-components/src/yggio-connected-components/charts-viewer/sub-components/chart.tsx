/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
} from 'recharts';
import {format, fromUnixTime} from 'date-fns';
import {CurveType} from 'recharts/types/shape/Curve';

import TooltipContent from './tooltip-content';
import {Attributes, DataSerie} from '../types';
import {Y_AXIS_FONT_SIZE} from '../constants';

interface ChartProps {
  dataSeries: DataSerie[];
  attributes: Attributes;
  selectedInterpolation: CurveType;
  highlightedEntry: number | null;
  width?: string;
}

const Chart = (props: ChartProps) => {
  const noDataAvailable = !_.some(props.dataSeries, serie => !_.isEmpty(serie.data));

  return (
    <ResponsiveContainer width={props.width || '99%'} aspect={3}>
      <LineChart margin={{right: 0}}>
        <CartesianGrid strokeDasharray="1 1" fill='#fbfbfb' />
        <XAxis
          dataKey="unixTime"
          type="number"
          allowDataOverflow
          allowDuplicatedCategory={false}
          // @ts-ignore the type from recharts seems to be broken
          domain={props.attributes.xAxisDomain}
          tickFormatter={(time: number): string => {
            return format(fromUnixTime(time), props.attributes.timeFormat);
          }}
          ticks={props.attributes.ticks}
          axisLine={false}
        >
          {noDataAvailable && (
            <Label value="No data available" offset={180} position="top" style={{fill: '#777', fontStyle: 'italic'}} />
          )}
        </XAxis>
        <YAxis
          yAxisId='left'
          type={'number'}
          axisLine={false}
          tick={{fontSize: Y_AXIS_FONT_SIZE}}
          // @ts-ignore the type from recharts seems to be broken
          domain={props.attributes.yAxisDomain}
        />
        <Tooltip
          content={<TooltipContent />}
          filterNull={false}
        />
        {_.map(props.dataSeries, (serie, index) => (
          <Line
            type={props.selectedInterpolation}
            dataKey="value"
            data={serie.data}
            stroke={serie.color}
            strokeWidth={2}
            strokeOpacity={
              !_.isNull(props.highlightedEntry) && props.highlightedEntry !== index ? 0.2 : 1
            }
            yAxisId={serie.axis}
            dot={false}
            name={serie.deviceName}
            key={`${serie.deviceName}${serie.field}`}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
