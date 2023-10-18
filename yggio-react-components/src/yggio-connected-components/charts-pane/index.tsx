import React from 'react';
import {useQueries} from '@tanstack/react-query';

import {devicesRequests, devicesApi} from '../../api';
import {
  availableFieldsSelector,
  fieldOptionsSelector,
  chartEntriesSelector,
  deviceIdsInUrlSelector,
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

  const addedDevicesQuery = devicesApi.useDevicesQuery({
    params: {filter: {idPattern: addedDevicesIds}},
    enabled: addedDevicesIds.length > 0,
  });

  const addedDevices = addedDevicesQuery.data || [];

  const fieldsQueries = useQueries({
    queries: addedDevices.map(device => ({
      queryKey: ['statisticsFields', device.id],
      queryFn: async () => devicesRequests.getStatisticsFields(device._id),
      refetchOnWindowFocus: false,
    }))
  });

  const availableFields = availableFieldsSelector(addedDevices, fieldsQueries);

  const fieldOptions = fieldOptionsSelector(localState.fields, availableFields);

  const chartEntries = chartEntriesSelector(localState.fields, availableFields, addedDevices);

  return (
    <SidebarParent>
      <Sidebar
        addedDevices={addedDevices}
        localState={localState}
        sidebarState={sidebarState}
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
