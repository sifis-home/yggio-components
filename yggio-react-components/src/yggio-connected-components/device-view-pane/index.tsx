/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import {NextRouter} from 'next/router';
import {useTranslation} from 'react-i18next';

// Logic
import {selectNumItems, selectCalculations} from './selectors';
import {COLORS} from '../../constants';
import {useLocalState} from '../../hooks';
import {Device} from '../../types';
import {
  TAB_ITEMS,
  DEFAULT_TAB_WIDTH,
  LORA_TAB_ITEMS,
  BOX2_TAB_ITEMS,
  REAL_ESTATE_CORE_TAB_ITEM,
} from './constants';
import {
  devicesApi,
  channelsApi,
  calculationsApi,
} from '../../api';

// UI
import {ErrorView} from '../../global/styled';
import RecDeviceEditor from '../rec-device-editor';
import {Calculations} from './containers';
import DetailsSidebar from './sub-components/sidebar';
import HeadingBar from './sub-components/heading-bar';
import ContainerBox from '../../components/container-box';
import Spinner from '../../components/spinner';
import {getTabItems} from './utils';
import {
  GeneralInfo,
  Specifications,
  Data,
  Charts,
  Logs,
  Translators,
  Position,
  AccessRights,
  LoRaControl,
  Channels,
  Box2Downlink,
  Commands,
  ContextualParameters,
  ReportInterval,
  Tools,
} from './sub-components';

import {
  SidebarParent,
  SidebarSibling,
  sidebarState,
} from '../../components/sidebar-components';
import {
  MainContentWrapper,
  MainContentContainer,
  LoadingView
} from './styled';

interface BasicDeviceDetailPaneProps {
  deviceId: string;
  tabId: string;
  router: NextRouter;
}

const DeviceViewPane = (props: BasicDeviceDetailPaneProps) => {

  // Hooks
  const {t} = useTranslation();

  const deviceQuery = devicesApi.useDeviceQuery({deviceId: props.deviceId});

  const recConnectorDevicesQuery = devicesApi.useConnectorDevicesQuery('RealEstateCore');
  const channelsQuery = channelsApi.useChannelsQuery(props.deviceId);
  const calculationsQuery = calculationsApi.useCalculationsQuery();

  const sidebarForm = useLocalState(sidebarState);

  const hasRecConnector = !_.isEmpty(recConnectorDevicesQuery.data);
  const tabItems = getTabItems(hasRecConnector, deviceQuery.data);
  const tabItem = _.find(tabItems, {path: props.tabId});

  // Alternative renders

  if (deviceQuery.isError) {
    return <ErrorView>Failed to get device</ErrorView>;
  }

  if (deviceQuery.isLoading) {
    return (
      <LoadingView>
        <Spinner color={COLORS.greenRacing} size={30} margin={'0 0 5px 0'} />
        {t('phrases.fetchingDevice')}...
      </LoadingView>
    );
  }

  if (!tabItem) {
    return <ErrorView>404 - Page does not exist</ErrorView>;
  }

  // Selectors

  const device = deviceQuery.data;

  const calculationsItems = selectCalculations({calculations: calculationsQuery.data, device});

  const numItems = selectNumItems({
    device,
    calculations: calculationsItems,
    channels: channelsQuery.data,
  });

  const tabWidth = tabItem.width || DEFAULT_TAB_WIDTH;

  return (
    <SidebarParent>
      <DetailsSidebar
        device={device}
        router={props.router}
        tabId={props.tabId}
        isSidebarOpen={sidebarForm.isSidebarOpen}
        closeSidebar={sidebarForm.closeSidebar}
        openSidebar={sidebarForm.openSidebar}
        calculations={calculationsQuery.data}
        numItems={numItems}
        siblingWidth={tabWidth}
        tabItems={tabItems!}
      />
      <SidebarSibling isSidebarOpen={sidebarForm.isSidebarOpen}>
        <MainContentWrapper>
          <MainContentContainer maxWidth={tabWidth}>
            <HeadingBar
              closeSidebar={sidebarForm.closeSidebar}
              openSidebar={sidebarForm.openSidebar}
              isSidebarOpen={sidebarForm.isSidebarOpen}
              tabItem={tabItem}
              siblingWidth={tabWidth}
            />
            <ContainerBox padding={'30px'}>
              {{
                [TAB_ITEMS.generalInfo.path]: (
                  <GeneralInfo
                    device={device}
                    router={props.router}
                  />
                ),
                [TAB_ITEMS.specifications.path]: (
                  <Specifications device={device} />
                ),
                [TAB_ITEMS.translators.path]: (
                  <Translators device={device} />
                ),
                [TAB_ITEMS.position.path]: (
                  <Position
                    deviceQuery={deviceQuery}
                    router={props.router}
                  />
                ),
                [TAB_ITEMS.channels.path]: (
                  <Channels
                    device={device}
                    channels={channelsQuery.data}
                  />
                ),
                [TAB_ITEMS.calculations.path]: (
                  <Calculations
                    device={device}
                    router={props.router}
                    calculations={calculationsQuery.data}
                    calculationsItems={calculationsItems}
                  />
                ),
                [TAB_ITEMS.accessrights.path]: (
                  <AccessRights deviceId={device._id} />
                ),
                [LORA_TAB_ITEMS.loraControl.path]: (
                  <LoRaControl device={device} />
                ),
                [TAB_ITEMS.data.path]: (
                  <Data device={device} />
                ),
                [BOX2_TAB_ITEMS.downlink.path]: (
                  <Box2Downlink deviceId={props.deviceId} />
                ),
                [TAB_ITEMS.contextualParameters.path]: (
                  <ContextualParameters device={device} />
                ),
                [TAB_ITEMS.commands.path]: (
                  <Commands device={device}/>
                ),
                [TAB_ITEMS.charts.path]: (
                  <Charts
                    deviceId={props.deviceId}
                    router={props.router}
                  />
                ),
                [TAB_ITEMS.reportInterval.path]: (
                  <ReportInterval device={device} />
                ),
                [TAB_ITEMS.tools.path]: (
                  <Tools device={device} />
                ),
                [REAL_ESTATE_CORE_TAB_ITEM.path]: (
                  <RecDeviceEditor
                    deviceId={props.deviceId}
                    connectors={recConnectorDevicesQuery.data as Device[]}
                  />
                ),
                [TAB_ITEMS.logs.path]: (
                  <Logs deviceId={props.deviceId} />
                ),
              }[props.tabId]}
            </ContainerBox>
          </MainContentContainer>
        </MainContentWrapper>
      </SidebarSibling>
    </SidebarParent>
  );
};

export default DeviceViewPane;
