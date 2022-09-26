/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
/*
################# TODO START: Implement support for charts #################

import {devicesRequests} from '../../../api';
import {useQuery} from 'react-query';
import ContainerBox from '../../../components/container-box';
import Select from '../../../components/select';
import {ChartEntry} from '../../charts-viewer/types';
import ChartsViewer from '../../charts-viewer';
import {usePersistentState} from '../../../hooks';
import {chartsState} from '../state';
import {FlexSpaceBetweenWrapper, MarginWrapper} from '../../global/styled';


const Charts = props => {

  const rulesQuery = rulesApi.useRulesQuery();
  const state = usePersistentState(chartsState, 'dashboard');
  const {_id: deviceId} = _.last(devicesQuery?.data);
  const chartEntry1: ChartEntry = {
    deviceId,
    deviceName: 'yeah',
    field: state.formInputs.field1.value as string,
    axis: 'left',
  };
  const chartEntry2: ChartEntry = {
    deviceId,
    deviceName: 'yeah',
    field: state.formInputs.field2.value as string,
    axis: 'left',
  };
  const fieldsQuery = useQuery(
    ['devices', deviceId, 'statistics', 'fields'],
    async () => devicesRequests.getStatisticsFields(deviceId),
    {refetchOnWindowFocus: false}
  );

  return (
      <MarginWrapper margin={'0 0 10px 0'}>
        <FlexSpaceBetweenWrapper>
          <ContainerBox width={'calc(50% - 5px)'} height={'300px'}>
            <Select
              label={'Field1'}
              options={_.map(fieldsQuery.data, field => ({value: field, label: field}))}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => (
                state.setInputValue('field1', evt.target.value)
              )}
              value={state.formInputs.field1.value as string}
              margin={'0 0 20px 0'}
            />
            {!!state.formInputs.field1.value as boolean && (
              <ChartsViewer
                type={'simple'}
                chartEntries={[chartEntry1]}
                hideLegend={true}
              />
            )}
          </ContainerBox>

          <ContainerBox width={'calc(50% - 5px)'} height={'300px'}>
            <Select
              label={'Field2'}
              options={_.map(fieldsQuery.data, field => ({value: field, label: field}))}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) => (
                state.setInputValue('field2', evt.target.value)
              )}
              value={state.formInputs.field2.value as string}
              margin={'0 0 20px 0'}
            />
            {!!state.formInputs.field2.value as boolean && (
              <ChartsViewer
                type={'simple'}
                chartEntries={[chartEntry2]}
                hideLegend={true}
              />
            )}
          </ContainerBox>
        </FlexSpaceBetweenWrapper>
      </MarginWrapper>
  )
};

export default Charts;

################# TODO END: Implement support for charts ################# */
