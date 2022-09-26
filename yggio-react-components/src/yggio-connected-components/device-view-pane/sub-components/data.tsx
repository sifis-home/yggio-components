/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {Code} from '@chakra-ui/react';

// Logic
import {DATA_DISPLAY_OPTIONS, DATA_FILTER_OPTIONS} from '../constants';
import {useLocalState} from '../../../hooks';
import {dataState} from '../state';
import {selectDataFilterOptions, selectDeviceData} from '../selectors';
import {Device, Translate} from '../../../types';
import {DataFilter} from '../types';

// UI
import SegmentedControl from '../../../components/segmented-control';
import DataViewer from '../../../components/data-viewer';
import {FlexColWrapper, FlexWrapper} from '../../../global/styled';
import {
  DataSetting,
  DataContainer,
  NoDataBox,
} from '../styled';

interface DataProps {
  device: Device;
  t: Translate;
}

const Data = (props: DataProps) => {
  const dataForm = useLocalState(dataState);
  const dataFilterOptions = selectDataFilterOptions({device: props.device});

  const deviceData = selectDeviceData({
    device: props.device,
    filter: dataForm.formInputs.filter.value as DataFilter,
  }) as Record<string, string | number>;

  return (
    <FlexColWrapper>
      <FlexWrapper>

        <DataSetting>
          <p>{_.capitalize(props.t('labels.filter'))}</p>
          <SegmentedControl
            options={dataFilterOptions}
            value={dataForm.formInputs.filter.value}
            onChange={value => {
              dataForm.setInputValue('filter', value as string);
            }}
            margin={'0 14px 0 0'}
          />
        </DataSetting>

        <DataSetting>
          <p>{_.capitalize(props.t('labels.display'))}</p>
          <SegmentedControl
            options={DATA_DISPLAY_OPTIONS}
            value={dataForm.formInputs.display.value}
            onChange={value => {
              dataForm.setInputValue('display', value as string);
            }}
          />
        </DataSetting>

      </FlexWrapper>
      <DataContainer>

        {!deviceData && (
          <NoDataBox>
            {DATA_FILTER_OPTIONS[dataForm.formInputs.filter.value as DataFilter].noValuesText}
          </NoDataBox>
        )}
        {deviceData && dataForm.formInputs.display.value === 'pretty' && (
          <DataViewer data={deviceData} />
        )}
        {deviceData && dataForm.formInputs.display.value === 'raw' && (
          <Code fontSize={'0.8rem'}>
            <pre>
              {JSON.stringify(deviceData, null, 2)}
            </pre>
          </Code>
        )}
      </DataContainer>
    </FlexColWrapper>
  );
};

export default Data;
