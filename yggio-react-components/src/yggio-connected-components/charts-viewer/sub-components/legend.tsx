import React from 'react';
import _ from 'lodash';

import {LegendEntry} from '../types';
import {
  LegendSection,
  LowerSectionHeading,
  TooltipColorBar,
  LegendEntryContainer,
  LegendEntryDeviceName,
  LegendEntryField,
  LegendEntryEmptyDataNote
} from '../styled';

interface LegendProps {
  legendEntries: LegendEntry[];
  setHightlightedEntry: (index: number | null) => void;
}

const Legend = (props: LegendProps) => {
  return (
    <LegendSection>
      <LowerSectionHeading>Legend</LowerSectionHeading>
      {_.map(props.legendEntries, (entry, index) => (
        <LegendEntryContainer
          key={`${entry.deviceName}${entry.field}`}
          onMouseEnter={() => props.setHightlightedEntry(index)}
          onMouseLeave={() => props.setHightlightedEntry(null)}
        >
          <TooltipColorBar color={entry.color} />
          <LegendEntryDeviceName>{entry.deviceName} -</LegendEntryDeviceName>
          <LegendEntryField>{entry.field}</LegendEntryField>
          {entry.isDataEmpty && (
            <LegendEntryEmptyDataNote>(no data)</LegendEntryEmptyDataNote>
          )}
        </LegendEntryContainer>
      ))}
    </LegendSection>
  );
};

export default Legend;
