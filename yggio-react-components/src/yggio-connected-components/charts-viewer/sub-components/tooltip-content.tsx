/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {TooltipProps} from 'recharts';

import {
  TooltipContainer,
  TooltipEntry,
  TooltipColorBar,
  TooltipEntryValue,
  TooltipTime,
} from '../styled';

import {FormattedDataPoint} from '../types';

const TooltipContent = (props: TooltipProps<number, string>) => {

  if (!props.active || !props.payload || !props.payload.length) {
    return null;
  }

  const dataPoints = _.map(props.payload, dataPoint => {
    const formattedDataPoint = dataPoint.payload as FormattedDataPoint;
    const valueText = formattedDataPoint.roundedValue.toString();
    return {
      valueText,
      color: dataPoint.color || 'black',
    };
  });

  const {formattedTime} = props.payload[0].payload as FormattedDataPoint;

  return (
    <TooltipContainer>
      {_.map(dataPoints, (point, index) => (
        <TooltipEntry key={index}>
          <TooltipColorBar color={point.color} />
          <TooltipEntryValue>
            {point.valueText}
          </TooltipEntryValue>
        </TooltipEntry>
      ))}
      <TooltipTime>{formattedTime}</TooltipTime>
    </TooltipContainer>
  );
};

export default TooltipContent;
