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
