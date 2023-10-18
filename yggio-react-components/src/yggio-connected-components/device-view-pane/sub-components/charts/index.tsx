import React, {useState} from 'react';
import _ from 'lodash';
import {useQuery} from '@tanstack/react-query';
import {NextRouter} from 'next/router';

import {devicesRequests} from '../../../../api';
import {ChartEntry} from '../../../charts-viewer/types';
import ChartsViewer from '../../../charts-viewer';
import Select from '../../../../components/select';
import {AdvancedChartLink} from './styled';

interface Props {
  deviceId: string;
  router: NextRouter;
}

const Charts = (props: Props) => {

  const [selectedField, setSelectedField] = useState<string>();

  const chartEntry: ChartEntry = {
    deviceId: props.deviceId,
    deviceName: 'yeah',
    field: selectedField!,
    axis: 'left',
  };

  const fieldsQuery = useQuery(
    ['statisticsFields', props.deviceId],
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
        onChange={evt => setSelectedField(evt.target.value)}
        value={selectedField}
        margin={'0 0 20px 0'}
      />
      {!!selectedField && (
        <ChartsViewer
          chartEntries={[chartEntry]}
          hideLegend
        />
      )}
    </>
  );
};

export default Charts;
