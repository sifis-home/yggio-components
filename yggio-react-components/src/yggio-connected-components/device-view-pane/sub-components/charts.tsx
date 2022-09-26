/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {useQuery} from '@tanstack/react-query';
import {NextRouter} from 'next/router';

import {devicesRequests} from '../../../api';
import {chartsState} from '../state';
import {useLocalState} from '../../../hooks';
import {ChartEntry} from '../../charts-viewer/types';

import ChartsViewer from '../../charts-viewer';
import Select from '../../../components/select';
import {AdvancedChartLink} from '../styled';

interface Props {
  deviceId: string;
  router: NextRouter;
}

const Charts = (props: Props) => {

  const state = useLocalState(chartsState);

  const chartEntry: ChartEntry = {
    deviceId: props.deviceId,
    deviceName: 'yeah',
    field: state.formInputs.field.value as string,
    axis: 'left',
  };

  const fieldsQuery = useQuery(
    ['devices', props.deviceId, 'statistics', 'fields'],
    async () => devicesRequests.getStatisticsFields(props.deviceId),
    {refetchOnWindowFocus: false}
  );

  return (
    <>
      <AdvancedChartLink
        onClick={async () => props.router.push(`/charts?devices=${props.deviceId}`)}
      >
        Go to advanced view
      </AdvancedChartLink>
      <Select
        label={'Field'}
        options={_.map(fieldsQuery.data, field => ({value: field, label: field}))}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => (
          state.setInputValue('field', evt.target.value)
        )}
        value={state.formInputs.field.value as string}
        margin={'0 0 20px 0'}
      />
      {!!state.formInputs.field.value && (
        <ChartsViewer
          chartEntries={[chartEntry]}
          hideLegend
        />
      )}
    </>
  );
};

export default Charts;
