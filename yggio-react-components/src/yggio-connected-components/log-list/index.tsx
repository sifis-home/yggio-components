/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useState, useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import _ from 'lodash';

import {getRequestErrorMessage} from '../../utils';
import {useLocalState} from '../../hooks';
import state from './state';
import {PAGE_SIZES} from './constants';
import {logsRequests} from '../../api';
import {extractFilterParams} from './utils';
import {Container, EmptyListContainer, LogsContainer} from './styled';
import Spinner from '../../components/spinner';
import Button from '../../components/button';

import Header from './sub-components/header';
import Log from './sub-components/log';
import Footer from './sub-components/footer';
import type {CursorDirection} from '../../components/cursor-pagination';

interface LogListProps {
  resourceId?: string;
  showOnlyList?: boolean;
  pageSize?: number;
  shouldStartWithAlarmsFilter?: boolean;
  margin?: string;
}

const LogList = (props: LogListProps) => {

  // HOOKS

  const filterForm = useLocalState(state);

  useEffect(() => {
    if (props.shouldStartWithAlarmsFilter) {
      filterForm.setInputValue('priorityFilter', ['high', 'severe']);
      filterForm.setInputValue('verifiedFilter', 'unverified');
    }
  }, []);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(props.pageSize || PAGE_SIZES[20]);
  const [cursorId, setCursorId] = useState<string>();
  const [cursorDirection, setCursorDirection] = useState<CursorDirection>();

  const filterParams = extractFilterParams(filterForm);

  const params = {
    resourceType: 'device',
    ...(props.resourceId && {resourceId: props.resourceId}),
    cursorId,
    cursorDirection,
    limit: pageSize,
    ...filterParams,
  };

  const logsQuery = useQuery(
    ['logs', params],
    async () => logsRequests.fetch(params),
    {
      refetchInterval: 1000 * 60 * 2,
      refetchOnWindowFocus: false,
      meta: {
        suppressErrorToaster: true,
      }
    }
  );

  // EVENTS

  const handlePaginationClick = (cursorId: string, cursorDirection: CursorDirection, newPage: number) => {
    setCursorId(cursorId);
    setCursorDirection(cursorDirection);
    setPage(newPage);
  };

  const resetPagination = () => {
    setCursorId(undefined);
    setCursorDirection(undefined);
    setPage(1);
  };

  return (
    <Container margin={props.margin}>
      {!props.showOnlyList && (
        <Header
          filterForm={filterForm}
          setPage={setPage}
          logsQuery={logsQuery}
          numActiveFilters={_.size(filterParams)}
          resetPagination={resetPagination}
        />
      )}
      {logsQuery.isLoading && (
        <EmptyListContainer>
          <Spinner color={'#555'} size={19} margin={'0 8px 0 0'} />
          Fetching logs...
        </EmptyListContainer>
      )}
      {logsQuery.isError && (
        <EmptyListContainer>
          Failed to fetch logs: {getRequestErrorMessage(logsQuery.error)}
        </EmptyListContainer>
      )}
      {logsQuery.data && _.isEmpty(logsQuery.data) && _.isEmpty(filterParams) && page === 1 && (
        <EmptyListContainer>
          {props.resourceId ? 'Device has no logs' : 'There are no logs yet'}
        </EmptyListContainer>
      )}
      {logsQuery.data && _.isEmpty(logsQuery.data) && _.isEmpty(filterParams) && page > 1 && (
        <EmptyListContainer>
          Oops, this page is empty
          <Button
            label={'Go back to first page'}
            onClick={() => resetPagination()}
            width={'180px'}
            margin={'10px 0 0 0'}
          />
        </EmptyListContainer>
      )}
      {logsQuery.data && _.isEmpty(logsQuery.data) && !_.isEmpty(filterParams) && (
        <EmptyListContainer>
          No logs found with current filter
        </EmptyListContainer>
      )}
      {!_.isEmpty(logsQuery.data) && (
        <>
          <LogsContainer hideLastBorder={props.showOnlyList}>
            {_.map(logsQuery.data, log => (
              <Log log={log} shouldShowResource={!props.resourceId} key={log._id} />
            ))}
          </LogsContainer>
          {!props.showOnlyList && (
            <Footer
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              resetPagination={resetPagination}
              logs={logsQuery.data!}
              handlePaginationClick={handlePaginationClick}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default LogList;
