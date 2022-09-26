/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {useQuery, useQueries} from '@tanstack/react-query';

import {devicesRequests} from '../../api';
import {
  addDeviceOptionsSelector,
  availableFieldsSelector,
  fieldOptionsSelector,
  chartEntriesSelector,
  deviceIdsInUrlSelector,
  addedDevicesSelector,
} from './selectors';
import {useLocalState} from '../../hooks';
import localStateOptions from './state';
import {SIDEBAR_SIBLING_MAX_WIDTH} from './constants';

import {
  SidebarParent,
  SidebarSibling,
  sidebarState as sidebarStateOptions,
} from '../../components/sidebar-components';
import Sidebar from './sub-components/sidebar';
import HeadingBar from './sub-components/heading-bar';
import {CenteredPage} from '../../global/components';
import ContainerBox from '../../components/container-box';
import {NoSourceView} from './styled';

import ChartsViewer from '../charts-viewer';

const ChartsPane = () => {

  const addedDevicesIds = deviceIdsInUrlSelector();

  const sidebarState = useLocalState(sidebarStateOptions);
  const localState = useLocalState(localStateOptions);

  const addedDevicesQueries = useQueries({
    queries: addedDevicesIds.map(deviceId => ({
      queryKey: ['devices', deviceId],
      queryFn: async () => devicesRequests.fetchOne({deviceId}),
      refetchOnWindowFocus: false,
    }))
  });

  const addedDevices = addedDevicesSelector(addedDevicesQueries);

  const devicesQuery = useQuery(
    ['devices'],
    async () => devicesRequests.fetch({}),
    {refetchOnWindowFocus: false}
  );

  const fieldsQueries = useQueries({
    queries: addedDevices.map(device => ({
      queryKey: ['devices', device.id, 'statistics', 'fields'],
      queryFn: async () => devicesRequests.getStatisticsFields(device.id),
      refetchOnWindowFocus: false,
    }))
  });

  const addDeviceOptions = addDeviceOptionsSelector(addedDevices, devicesQuery.data);

  const availableFields = availableFieldsSelector(addedDevices, fieldsQueries);

  const fieldOptions = fieldOptionsSelector(localState.fields, availableFields);

  const chartEntries = chartEntriesSelector(localState.fields, availableFields, devicesQuery.data);

  return (
    <SidebarParent>
      <Sidebar
        addedDevices={addedDevices}
        localState={localState}
        sidebarState={sidebarState}
        addDeviceOptions={addDeviceOptions}
        availableFields={availableFields}
        fieldOptions={fieldOptions}
      />
      <SidebarSibling isSidebarOpen={sidebarState.isSidebarOpen}>
        <CenteredPage maxWidth={`${SIDEBAR_SIBLING_MAX_WIDTH}px`}>
          <HeadingBar sidebarState={sidebarState} />
          <ContainerBox padding={'10px 30px 30px 30px'}>
            {chartEntries.length > 0 ? (
              <ChartsViewer chartEntries={chartEntries} />
            ) : (
              <NoSourceView>
                <div>
                  <h3>No source</h3>
                  <p>Please select devices and fields in the sidebar</p>
                </div>
              </NoSourceView>
            )}
          </ContainerBox>
        </CenteredPage>
      </SidebarSibling>
    </SidebarParent>
  );
};

export default ChartsPane;
