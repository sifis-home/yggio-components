/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useState} from 'react';
import {useQueries} from '@tanstack/react-query';
import {CurveType} from 'recharts/types/shape/Curve';

import {getStatistics} from '../../api/devices/requests';
import {selectAttributes, selectDataSeries, selectLegendEntries} from './selectors';
import {useLocalState} from '../../hooks';
import state from './state';
import {ChartEntry} from './types';

import Chart from './sub-components/chart';
import Options from './sub-components/options';
import Legend from './sub-components/legend';
import {Container, LowerSection, NoDataView} from './styled';

interface ChartsViewerContentProps {
  chartEntries: ChartEntry[];
  hideLegend?: boolean;
  orientation?: string;
  type?: 'simple' | 'full';
}

const ChartsViewerContent = (props: ChartsViewerContentProps) => {

  const [highlightedEntry, setHightlightedEntry] = useState<number | null>(null);

  const form = useLocalState(state);

  const attributes = selectAttributes(form.formInputs);

  const params = attributes ? {
    startTime: attributes.startTime * 1000,
    endTime: attributes.endTime * 1000,
    distance: attributes.distance,
  } : null;

  const statsQueries = useQueries({
    queries: props.chartEntries.map(entry => ({
      queryKey: ['statistics', entry.deviceId, entry.field, params],
      queryFn: async () => getStatistics(
        entry.deviceId,
        entry.field,
        params!.startTime,
        params!.endTime,
        params!.distance,
      ),
      enabled: !!params,
      refetchOnWindowFocus: false,
    }))
  });

  const dataSeries = selectDataSeries(statsQueries, props.chartEntries);

  const legendEntries = selectLegendEntries(dataSeries);

  return (
    <Container>
      {attributes ? (
        <Chart
          dataSeries={dataSeries!}
          attributes={attributes}
          selectedInterpolation={form.formInputs.interpolation.value as CurveType}
          highlightedEntry={highlightedEntry}
        />
      ) : (
        <NoDataView>Please enter custom time period</NoDataView>
      )}
      <LowerSection>
        {props.type !== 'simple' && (
          <Options
            form={form}
            hideLegend={props.hideLegend}
          />
        )}
        {(!!dataSeries && !props.hideLegend) && (
          <Legend
            legendEntries={legendEntries}
            setHightlightedEntry={setHightlightedEntry}
          />
        )}
      </LowerSection>
    </Container>
  );
};

interface ChartsViewerProps {
  chartEntries: ChartEntry[];
  hideLegend?: boolean;
  orientation?: 'landscape';
  type?: 'simple' | 'full';
}

const ChartsViewer = (props: ChartsViewerProps) => {

  return (
    <>
      {props.chartEntries.length === 0 ? (
        <p>No source</p>
      ) : (
        <ChartsViewerContent
          {...props}
        />
      )}
    </>
  );
};

export default ChartsViewer;
