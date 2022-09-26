/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import React from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {compose} from 'lodash/fp';

import {usePersistentState, useLocalState} from '../../hooks';
import {SIDEBAR_SIBLING_WIDTH, PAGES} from './constants';
import {modalState} from '../../components/modal';
import {MainContentWrapper, MainContentContainer} from './styled';
import {selectPageInfo, selectTags} from './selectors';
import events from './events';
import {SidebarParent, SidebarSibling, sidebarState} from '../../components/sidebar-components';
import Calculations from './containers/calculation-pane';
import Tools from './containers/tools-pane';
import Configuration from './containers/configuration-pane';
import Editing from './containers/editing-pane';
import ReportInterval from './containers/report-interval-pane';
import Deletion from './containers/deletion-pane';
import Channels from './containers/channels-pane';
import {devicesApi, userApi, jobApi} from '../../api';
import {useAccessRightsResult} from './queries';
import {withEvents, withContext, withLanguage} from '../../hocs';
import {createAttributeFilter, createMatchPattern, createOrderByParam} from './utils';
import {
  generalState,
  formState,
  persistentState,
  pageState,
  contextActions as actions,
  StateContext as context,
  StateContextProvider,
} from './state';
import {
  Sidebar,
  HeadingBar,
  FilterBar,
  SelectionBar,
  Table,
} from './sub-components';

const BasicDevicesListPane = props => {

  // HOOKS

  const queryClient = useQueryClient();

  const userQuery = userApi.useTokenUser();

  const useRemoveDevices = jobApi.useRemoveDevicesJob(queryClient);

  const filterState = usePersistentState(formState, 'devices-list-filter');
  const listState = usePersistentState(persistentState, 'devices-list-ui');

  const routeState = useLocalState(pageState);
  const generalModalState = useLocalState(generalState);
  const columnsModalState = useLocalState(modalState);
  const sidebarToggleState = useLocalState(sidebarState);

  const matchPattern = createMatchPattern(_.get(filterState, 'formInputs'));
  const attributeExists = createAttributeFilter(_.get(filterState, 'formInputs'));
  const offset = (listState.pageSize * listState.currentPage) - listState.pageSize;
  const orderBy = createOrderByParam(listState.sortingField, listState.sortingOrder);
  const devicesParams = {
    limit: listState.pageSize,
    offset,
    orderBy,
    filter: {matchPattern, attributeExists},
  };

  const numDevicesQuery = devicesApi.useNumDevicesQuery();
  const devicesQuery = devicesApi.useDevicesWithNumTotalDevicesQuery({params: devicesParams});
  const accessRightsResult = useAccessRightsResult({subjectId: _.get(userQuery, 'data._id')});

  // SELECTORS

  const devices = devicesQuery.data?.body;
  const numFilteredDevices = Number(devicesQuery.data?.headers['fiware-total-count']);

  const pageInfo = selectPageInfo({
    currentPage: listState.currentPage,
    pageSize: listState.pageSize,
    devices,
    numFilteredDevices,
    t: props.t,
  });

  const filterTags = selectTags({formInputs: filterState.formInputs});

  // EVENTS

  const handleValueChange = evt => {
    const {target: {value, name}} = evt;
    filterState.setInputValue(name, value);
    listState.setCurrentPage(1);
  };

  const handleSetPageSize = evt => {
    const {target: {value}} = evt;
    listState.setPageSize(Number(value));
    listState.setCurrentPage(1);
  };

  const handleSetSorting = field => () => {
    if (listState.sortingOrder === 'asc' && listState.sortingField === field) {
      listState.setSortingOrder('desc');
    } else {
      listState.setSortingOrder('asc');
    }
    listState.setSortingField(field);
  };

  const removeSelectedDevices = async () => {
    useRemoveDevices.mutate(props.selectedDevices);
    props.setSelectedDevices([]);
    props.setSelectMode(false);
  };

  const clearFilters = () => {
    filterState.resetForm();
  };

  const handleSelectAllDevices = evt => {
    const {target: {checked}} = evt;
    if (checked) {
      const allDevices = _.map(devices, '_id');
      props.setSelectedDevices(allDevices);
    } else {
      props.setSelectedDevices([]);
    }
  };

  return (
    <SidebarParent>
      {{
        [PAGES.default]: (
          <>
            <Sidebar
              clearFilters={clearFilters}
              filterTags={filterTags}
              setFilterCollapsed={listState.setFilterCollapsed}
              filterCollapsed={listState.filterCollapsed}
              handleTypeCheckbox={props.handleTypeCheckbox}
              handleValueChange={handleValueChange}
              formInputs={filterState.formInputs}
              isSidebarOpen={sidebarToggleState.isSidebarOpen}
              closeSidebar={sidebarToggleState.closeSidebar}
              openSidebar={sidebarToggleState.openSidebar}
              t={props.t}
            />
            <SidebarSibling isSidebarOpen={sidebarToggleState.isSidebarOpen}>
              <MainContentWrapper>
                <MainContentContainer maxWidth={SIDEBAR_SIBLING_WIDTH}>

                  <HeadingBar
                    router={props.router}
                    deviceTotalCount={numDevicesQuery.data}
                    isLoading={devicesQuery.isLoading}
                    isSidebarOpen={sidebarToggleState.isSidebarOpen}
                    closeSidebar={sidebarToggleState.closeSidebar}
                    openSidebar={sidebarToggleState.openSidebar}
                    setSelectMode={props.setSelectMode}
                    selectMode={props.selectMode}
                    numFilteredDevices={numFilteredDevices}
                    columns={listState.columns}
                    setColumns={listState.setColumns}
                    customizeColumnsModal={columnsModalState}
                    siblingWidth={SIDEBAR_SIBLING_WIDTH}
                    t={props.t}
                  />

                  {!_.isEmpty(filterTags) && (
                    <FilterBar
                      handleTypeCheckbox={props.handleTypeCheckbox}
                      deviceTotalCount={numDevicesQuery.data}
                      filterTags={filterTags}
                      numFilteredDevices={numFilteredDevices}
                      setInputValue={filterState.setInputValue}
                      t={props.t}
                    />
                  )}

                  {!!props.selectMode && (
                    <SelectionBar
                      router={props.router}
                      setSelectMode={props.setSelectMode}
                      selectedDevices={props.selectedDevices}
                      setSelectedDevices={props.setSelectedDevices}
                      removeSelectedDevices={removeSelectedDevices}
                      onCalculation={props.onCalculation}
                      setPage={routeState.setPage}
                      t={props.t}
                    />
                  )}

                  <Table
                    devices={devices}
                    error={devicesQuery.error}
                    router={props.router}
                    activateRuleAction={props.activateRuleAction}
                    accessRights={accessRightsResult}
                    numFilteredDevices={numFilteredDevices}
                    isLoading={devicesQuery.isLoading}
                    isFetching={devicesQuery.isFetching}
                    pageInfo={pageInfo}
                    pageSize={listState.pageSize}
                    handleSetPageSize={handleSetPageSize}
                    handleSetSorting={handleSetSorting}
                    sortingOrder={listState.sortingOrder}
                    sortingField={listState.sortingField}
                    setCurrentPage={listState.setCurrentPage}
                    currentPage={listState.currentPage}
                    selectMode={props.selectMode}
                    handleSelectAllDevices={handleSelectAllDevices}
                    selectedDevices={props.selectedDevices}
                    setDeviceSelected={props.setDeviceSelected}
                    columns={listState.columns}
                    deviceWithOpenStatusModal={generalModalState.deviceWithOpenStatusModal}
                    openStatusModal={generalModalState.openStatusModal}
                    closeStatusModal={generalModalState.closeStatusModal}
                    t={props.t}
                  />

                </MainContentContainer>
              </MainContentWrapper>
            </SidebarSibling>
          </>
        ),
        [PAGES.calculations]: (
          <Calculations
            router={props.router}
            selectedDevices={props.selectedDevices}
            devices={devices}
            createCalculation={props.createCalculation}
            seekDevices={props.seekDevices}
            setSelectedDevices={props.setSelectedDevices}
            setSelectMode={props.setSelectMode}
            setPage={routeState.setPage}
          />
        ),
        [PAGES.tools]: (
          <Tools
            selectedDevices={props.selectedDevices}
            devices={devices}
            setSelectedDevices={props.setSelectedDevices}
            setSelectMode={props.setSelectMode}
            setPage={routeState.setPage}
          />
        ),
        [PAGES.configuration]: (
          <Configuration
            t={props.t}
            router={props.router}
            selectedDevices={props.selectedDevices}
            devices={devices}
            setSelectedDevices={props.setSelectedDevices}
            setSelectMode={props.setSelectMode}
            setPage={routeState.setPage}
          />
        ),
        [PAGES.editing]: (
          <Editing
            t={props.t}
            router={props.router}
            selectedDevices={props.selectedDevices}
            devices={devices}
            setSelectedDevices={props.setSelectedDevices}
            setSelectMode={props.setSelectMode}
            setPage={routeState.setPage}
          />
        ),
        [PAGES.reportInterval]: (
          <ReportInterval
            t={props.t}
            selectedDevices={props.selectedDevices}
            devices={devices}
            setSelectedDevices={props.setSelectedDevices}
            setSelectMode={props.setSelectMode}
            setPage={routeState.setPage}
          />
        ),
        [PAGES.channels]: (
          <Channels
            t={props.t}
            selectedDevices={props.selectedDevices}
            devices={devices}
            setSelectedDevices={props.setSelectedDevices}
            setSelectMode={props.setSelectMode}
            setPage={routeState.setPage}
          />
        ),
        [PAGES.deletion]: (
          <Deletion
            t={props.t}
            selectedDevices={props.selectedDevices}
            devices={devices}
            setSelectedDevices={props.setSelectedDevices}
            setSelectMode={props.setSelectMode}
            setPage={routeState.setPage}
          />
        ),
      }[routeState.page]}
    </SidebarParent>
  );
};

const RawDevicesListPane = compose(
  withContext({context, actions}),
  withLanguage(),
  withEvents(events),
)(BasicDevicesListPane);

const withContextProvider = Component => props => (
  <StateContextProvider>
    <Component {...props} />
  </StateContextProvider>
);

const DevicesListPane = compose(
  withContextProvider,
)(RawDevicesListPane);

export default DevicesListPane;
