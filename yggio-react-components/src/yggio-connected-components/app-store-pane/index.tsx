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
import {Link, Box, Text, Flex} from '@chakra-ui/react';

import AppCard from './sub-components/app-card';
import {CenteredPage} from '../../global/components';
import ContainerBox from '../../components/container-box';
import CursorPagination from '../../components/cursor-pagination';
import {
  HeadingBar,
  Heading,
  SubHeading,
} from '../apps-pane/styled';
import {appApi} from '../../api';

import type {App} from './types';

interface Props {
  router: NextRouter;
}

const AppStorePane = (props: Props) => {
  const [cursorId, setCursorId] = React.useState<string | null>(null);
  const [cursorDirection, setCursorDirection] = React.useState<string | null>(null);
  const [sortOrder] = React.useState('name');

  const [pageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);

  const params = {
    limit: pageSize,
    orderBy: sortOrder,
    cursorId,
    cursorDirection,
    matchPattern: {},
    public: true,
  };
  const appsQuery = appApi.useAppsQuery(params);

  const handlePageChange = (
    id: string,
    direction: string,
    newPage: number,
  ) => {
    setCurrentPage(newPage);
    setCursorId(id);
    setCursorDirection(direction);
  };

  if (_.isEmpty(appsQuery.data?.items)) {
    return (
      <CenteredPage>
        <ContainerBox margin='20px 0 0'>
          <Flex justifyContent='center'>
            <Text fontSize='sm'>
              There are currently no apps available in the app store.
            </Text>
          </Flex>
        </ContainerBox>
      </CenteredPage>
    );
  }

  return (
    <CenteredPage maxWidth={'1200px'}>
      <Box m='10px 0 40px'>
        <Link onClick={async () => props.router.push('/apps')}>&lsaquo; Back to apps</Link>
      </Box>
      <HeadingBar>
        <Heading>App store</Heading>
        <SubHeading>Installable apps from the Yggio app store</SubHeading>
      </HeadingBar>
      <ContainerBox margin='20px 0 0'>
        <Flex
          wrap='wrap'
          gap='20px 20px'
          padding='30px'
        >
          {_.map(appsQuery.data?.items, (app: App) => (
            <AppCard
              key={app._id}
              app={app}
              router={props.router}
            />
          ))}
        </Flex>
        {(appsQuery.data?.totalCount && Number(appsQuery.data?.totalCount) > 10) && (
          <Flex w='100%' justifyContent='flex-end'>
            <CursorPagination
              nextId={_.last(appsQuery.data?.items)!.name}
              prevId={_.head(appsQuery.data?.items)!.name}
              totalItemsCount={Number(appsQuery.data.totalCount)}
              currentItemsCount={_.size(appsQuery.data?.items)}
              pageSize={pageSize}
              currentPage={currentPage}
              onChange={handlePageChange}
            />
          </Flex>
        )}
      </ContainerBox>
    </CenteredPage>
  );
};

export default AppStorePane;
