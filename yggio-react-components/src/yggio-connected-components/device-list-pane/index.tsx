import _ from 'lodash';
import React, {useState} from 'react';
import {NextRouter} from 'next/router';

// Logic
import {usePersistentState} from '../../hooks';
import {devicesApi} from '../../api';
import {SIDEBAR_SIBLING_WIDTH, PAGES} from './constants';
import {getDevicesQueryParams} from './utils';
import {getFormValues} from '../../utils/form-wizard';
import filterStateOptions from './state/filter-state';
import listStateOptions from './state/list-state';
import type {CursorDirection} from '../../components/cursor-pagination';

// UI
import {MainContentWrapper, MainContentContainer} from './styled';
import {SidebarParent, SidebarSibling} from '../../components/sidebar-components';
import {
  Calculations,
  Channels,
  Configuration,
  Deletion,
  Editing,
  ReportInterval,
  Synchronize,
  SetConnector,
} from './containers';
import {
  Sidebar,
  HeadingBar,
  FilterBar,
  SelectionBar,
  Table,
} from './sub-components';
import {FormInputs} from '../../types';

interface DevicesListPaneProps {
  router: NextRouter;
  formInputs: FormInputs;
}

const DevicesListPane = (props: DevicesListPaneProps) => {
  // HOOKS

  const filterState = usePersistentState(filterStateOptions, 'devices-list-filter');
  const listState = usePersistentState(listStateOptions, 'devices-list-ui');

  const [page, setPage] = useState(PAGES.default);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isInSelectMode, setIsInSelectMode] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);

  const devicesQueryParams = getDevicesQueryParams(
    filterState.formInputs,
    {...listState},
  );

  const numDevicesQuery = devicesApi.useNumDevicesQuery({params: devicesQueryParams});
  const devicesQuery = devicesApi.useDevicesQuery({params: devicesQueryParams, keepPreviousData: true});

  // SELECTORS

  const devices = devicesQuery.data;
  const numFilteredDevices = Number(numDevicesQuery?.data);
  const isFiltering = _.some(getFormValues(filterState.formInputs));

  // EVENTS

  const handleSetPageSize = (pageSize: number) => {
    listState.reset();
    listState.setPageSize(pageSize);
  };

  const onPageChange = (
    cursorId: string,
    cursorDirection: CursorDirection,
    newPage: number,
  ) => {
    listState.setCurrentPage(newPage);
    listState.setCursorId(cursorId);
    listState.setCursorDirection(cursorDirection);
  };

  return (
    <SidebarParent>
      {{
        [PAGES.default]: (
          <>
            <Sidebar
              isFiltering={isFiltering}
              filterForm={filterState}
              listState={listState}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <SidebarSibling isSidebarOpen={isSidebarOpen}>
              <MainContentWrapper>
                <MainContentContainer maxWidth={SIDEBAR_SIBLING_WIDTH}>

                  <HeadingBar
                    filterState={filterState}
                    listState={listState}
                    deviceTotalCount={numDevicesQuery.data}
                    devicesQueryIsLoading={devicesQuery.isLoading}
                    setIsInSelectMode={setIsInSelectMode}
                    isInSelectMode={isInSelectMode}
                    numFilteredDevices={numFilteredDevices}
                    columns={listState.columns}
                    setColumns={listState.setColumns}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    siblingWidth={SIDEBAR_SIBLING_WIDTH}
                    router={props.router}
                  />

                  {isFiltering && (
                    <FilterBar
                      form={filterState}
                      numFilteredDevices={numFilteredDevices}
                      deviceTotalCount={numDevicesQuery.data}
                    />
                  )}

                  {!!isInSelectMode && (
                    <SelectionBar
                      setIsInSelectMode={setIsInSelectMode}
                      selectedDevices={selectedDevices}
                      setSelectedDevices={setSelectedDevices}
                      setPage={setPage}
                      router={props.router}
                    />
                  )}

                  <Table
                    onPageChange={onPageChange}
                    devicesQuery={devicesQuery}
                    numFilteredDevices={numFilteredDevices}
                    selectedDevices={selectedDevices}
                    setSelectedDevices={setSelectedDevices}
                    isInSelectMode={isInSelectMode}
                    columns={listState.columns}
                    pageSize={listState.pageSize}
                    setPageSize={handleSetPageSize}
                    sortingOrder={listState.sortingOrder}
                    setSortingOrder={listState.setSortingOrder}
                    sortingField={listState.sortingField}
                    setSortingField={listState.setSortingField}
                    currentPage={listState.currentPage}
                    resetListState={listState.reset}
                    router={props.router}
                  />

                </MainContentContainer>
              </MainContentWrapper>
            </SidebarSibling>
          </>
        ),
        [PAGES.calculations]: (
          <Calculations
            devices={devices}
            selectedDevices={selectedDevices}
            setSelectedDevices={setSelectedDevices}
            setIsInSelectMode={setIsInSelectMode}
            setPage={setPage}
            router={props.router}
          />
        ),
        [PAGES.synchronize]: (
          <Synchronize
            devices={devices!}
            selectedDevices={selectedDevices}
            setSelectedDevices={setSelectedDevices}
            setIsInSelectMode={setIsInSelectMode}
            setPage={setPage}
          />
        ),

        [PAGES.setConnector]: (
          <SetConnector
            devices={devices!}
            selectedDevices={selectedDevices}
            setSelectedDevices={setSelectedDevices}
            setIsInSelectMode={setIsInSelectMode}
            setPage={setPage}
          />
        ),
        [PAGES.configuration]: (
          <Configuration
            devices={devices!}
            selectedDevices={selectedDevices}
            setSelectedDevices={setSelectedDevices}
            setIsInSelectMode={setIsInSelectMode}
            setPage={setPage}
          />
        ),
        [PAGES.editing]: (
          <Editing
            devices={devices!}
            selectedDevices={selectedDevices}
            setSelectedDevices={setSelectedDevices}
            setIsInSelectMode={setIsInSelectMode}
            setPage={setPage}
          />
        ),
        [PAGES.reportInterval]: (
          <ReportInterval
            devices={devices!}
            selectedDevices={selectedDevices}
            setSelectedDevices={setSelectedDevices}
            setIsInSelectMode={setIsInSelectMode}
            setPage={setPage}
          />
        ),
        [PAGES.channels]: (
          <Channels
            devices={devices!}
            selectedDevices={selectedDevices}
            setSelectedDevices={setSelectedDevices}
            setIsInSelectMode={setIsInSelectMode}
            setPage={setPage}
            router={props.router}
          />
        ),
        [PAGES.deletion]: (
          <Deletion
            selectedDevices={selectedDevices}
            setSelectedDevices={setSelectedDevices}
            setIsInSelectMode={setIsInSelectMode}
            setPage={setPage}
            resetListState={listState.reset}
          />
        ),
      }[page]}
    </SidebarParent>
  );
};

export default DevicesListPane;
