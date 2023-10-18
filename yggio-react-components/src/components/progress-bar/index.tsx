/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';

import {
  Bar,
  Filling,
} from './styled';

interface ProgressBarProps {
  progress?: number;
  barColor?: string;
  fillColor?: string;
  width?: string;
  height?: number;
  margin?: string;
}

const ProgressBar = (props: ProgressBarProps) => {
  return (
    <>
      <Bar
        barColor={props.barColor}
        width={props.width}
        height={props.height}
        margin={props.margin}
      >
        <Filling
          progress={props.progress}
          fillColor={props.fillColor}
          height={props.height}
        />
      </Bar>
    </>
  );

};

export default ProgressBar;
