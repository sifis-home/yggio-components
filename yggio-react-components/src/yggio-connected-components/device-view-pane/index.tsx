/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {NextRouter} from 'next/router';

// Logic
import {selectNumItems, selectCalculations} from './selectors';
import withLanguage from '../../hocs/with-language';
import {COLORS} from '../../constants';
import {useLocalState} from '../../hooks';
import {Translate, Device} from '../../types';
import {
  TAB_ITEMS,
  SIDEBAR_SIBLING_WIDTH,
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
import {modalState} from '../../components/modal';
import RecDeviceEditor from '../rec-device-editor';
import {Calculations} from './containers';
import DetailsSidebar from './sub-components/sidebar';
import HeadingBar from './sub-components/heading-bar';
import ContainerBox from '../../components/container-box';
import Spinner from '../../components/spinner';
import {
  AccessRights,
  Specifications,
  LoRaControl,
  Channels,
  Box2Downlink,
  GeneralInfo,
  ContextualParameters,
  Data,
  ReportInterval,
  Charts,
  Tools,
  Position,
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
  t: Translate;
  router: NextRouter;
}

const DeviceViewPane = (props: BasicDeviceDetailPaneProps) => {

  const deviceQuery = devicesApi.useDeviceQuery({deviceId: props.deviceId});

  const device = deviceQuery.data;

  const recConnectorDevicesQuery = devicesApi.useConnectorDevicesQuery('RealEstateCore');

  const channelsQuery = channelsApi.useChannelsQuery(props.deviceId);
  const calculationsQuery = calculationsApi.useCalculationsQuery();
  const calculationsItems = selectCalculations({calculations: calculationsQuery.data, device});

  const sidebarForm = useLocalState(sidebarState);
  const modalForm = useLocalState(modalState);

  const numItems = selectNumItems({
    calculations: calculationsItems,
    channels: channelsQuery.data,
    contextualParameters: device?.contextMap,
  });

  if (deviceQuery.isError) {
    return <div>Failed to get device</div>;
  }

  if (deviceQuery.isLoading) {
    return (
      <LoadingView>
        <Spinner color={COLORS.greenRacing} size={30} margin={'0 0 5px 0'} />
        {props.t('phrases.fetchingDevice')}...
      </LoadingView>
    );
  }

  return (
    <SidebarParent>
      <DetailsSidebar
        device={device!}
        router={props.router}
        tabId={props.tabId}
        isSidebarOpen={sidebarForm.isSidebarOpen}
        closeSidebar={sidebarForm.closeSidebar}
        openSidebar={sidebarForm.openSidebar}
        calculations={calculationsQuery.data}
        statusModal={modalForm}
        numItems={numItems}
        siblingWidth={SIDEBAR_SIBLING_WIDTH}
        hasRecConnector={!_.isEmpty(recConnectorDevicesQuery.data)}
        t={props.t}
      />
      <SidebarSibling isSidebarOpen={sidebarForm.isSidebarOpen}>
        <MainContentWrapper>
          <MainContentContainer maxWidth={SIDEBAR_SIBLING_WIDTH}>
            <HeadingBar
              closeSidebar={sidebarForm.closeSidebar}
              openSidebar={sidebarForm.openSidebar}
              isSidebarOpen={sidebarForm.isSidebarOpen}
              tabId={props.tabId}
              siblingWidth={SIDEBAR_SIBLING_WIDTH}
              t={props.t}
            />
            <ContainerBox padding={'30px'}>
              {{
                [TAB_ITEMS.generalInfo.path]: (
                  <GeneralInfo
                    deviceQuery={deviceQuery}
                    router={props.router}
                    t={props.t}
                  />
                ),
                [TAB_ITEMS.specifications.path]: (
                  <Specifications
                    device={device!}
                    t={props.t}
                  />
                ),
                [TAB_ITEMS.position.path]: (
                  <Position
                    deviceQuery={deviceQuery}
                    router={props.router}
                  />
                ),
                [TAB_ITEMS.channels.path]: (
                  <Channels
                    device={device!}
                    channels={channelsQuery.data}
                    t={props.t}
                  />
                ),
                [TAB_ITEMS.calculations.path]: (
                  <Calculations
                    device={device!}
                    router={props.router}
                    calculations={calculationsQuery.data}
                    calculationsItems={calculationsItems}
                    t={props.t}
                  />
                ),
                [TAB_ITEMS.accessrights.path]: (
                  <AccessRights
                    device={device!}
                    t={props.t}
                  />
                ),
                [LORA_TAB_ITEMS.loraControl.path]: (
                  <LoRaControl
                    device={device!}
                    t={props.t}
                  />
                ),
                [TAB_ITEMS.data.path]: (
                  <Data
                    device={device!}
                    t={props.t}
                  />
                ),
                [BOX2_TAB_ITEMS.downlink.path]: (
                  <Box2Downlink
                    deviceId={props.deviceId}
                    t={props.t}
                  />
                ),
                [TAB_ITEMS.contextualParameters.path]: (
                  <ContextualParameters
                    device={device!}
                    t={props.t}
                  />
                ),
                [TAB_ITEMS.charts.path]: (
                  <Charts
                    deviceId={props.deviceId}
                    router={props.router}
                  />
                ),
                [TAB_ITEMS.reportInterval.path]: (
                  <ReportInterval
                    device={device!}
                  />
                ),
                [TAB_ITEMS.tools.path]: (
                  <Tools
                    device={device!}
                  />
                ),
                [REAL_ESTATE_CORE_TAB_ITEM.path]: (
                  <RecDeviceEditor
                    deviceId={props.deviceId}
                    connectors={recConnectorDevicesQuery.data as Device[]}
                  />
                ),
              }[props.tabId]}
            </ContainerBox>
          </MainContentContainer>
        </MainContentWrapper>
      </SidebarSibling>
    </SidebarParent>
  );
};

export default withLanguage()(DeviceViewPane);
