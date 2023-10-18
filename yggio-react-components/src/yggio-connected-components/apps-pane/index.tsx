import React from 'react';
import _ from 'lodash';
import {NextRouter} from 'next/router';
import {useTranslation} from 'react-i18next';
import {Flex} from '@chakra-ui/react';

import {appApi} from '../../api';
import {selectCategorizedApps, selectFilteredApps} from './selectors';
import {useLocalState} from '../../hooks';
import state from './state';
import {APP_TAGS} from '../../constants/apps';

import {CenteredPage} from '../../global/components';
import ContainerBox from '../../components/container-box';
import Button from '../../components/button';
import CursorPagination from '../../components/cursor-pagination';
import TextField from '../../components/text-field';
import Select from '../../components/select';
import SelectMulti from '../../components/select-multi';
import AppCard from './sub-components/app-card';
import {
  SearchBar,
  HeadingBar,
  Heading,
  SubHeading,
  AppsContainer,
  NoAppsNote,
} from './styled';

import type {AppUnion} from './types';

interface Props {
  router: NextRouter;
}

const AppsPane = (props: Props) => {
  const form = useLocalState(state);

  const {t} = useTranslation();

  const isFiltering = !!form.formInputs.name.value || !_.isEmpty(form.formInputs.tags.value);

  const categorizedApps = selectCategorizedApps({});
  const filteredApps = selectFilteredApps(categorizedApps, form);

  return (
    <CenteredPage maxWidth={'1200px'}>
      <Flex justifyContent='flex-end'>
        <Button
          label='Create App'
          color='green'
          onClick={async () => props.router.push('/apps/new')}
          width='160px'
          margin='10px'
        />
        <Button
          label='App Store'
          color='blue'
          onClick={async () => props.router.push('/apps/store')}
          width='160px'
          margin='10px'
        />
      </Flex>
      <Flex
        alignItems='center'
        justifyContent='space-between'
        h='80px'
      >
        <HeadingBar>
          <Heading>Yggio Apps</Heading>
          <SubHeading>Apps created by Sensative</SubHeading>
        </HeadingBar>
        <SearchBar>
          <SelectMulti
            ariaLabel={_.capitalize(t('labels.filterByTags'))}
            options={_.map(APP_TAGS, tag => ({label: tag, value: tag}))}
            isClearable={false}
            placeholder={_.capitalize(t('labels.filterByTags'))}
            width={'300px'}
            onChange={evt => form.setInputValue('tags', evt.target.value)}
            value={form.formInputs.tags.value as unknown as string[]}
          />
          <TextField
            placeholder={_.capitalize(t('labels.filterByName'))}
            ariaLabel={_.capitalize(t('labels.filterByName'))}
            width={'200px'}
            value={form.formInputs.name.value as string}
            onChange={evt => form.setInputValue('name', evt.target.value)}
            height={'38px'}
          />
        </SearchBar>
      </Flex>
      <ContainerBox padding={'0'} margin={'0 0 35px 0'}>
        <AppsContainer>
          {_.map(filteredApps.yggioApps, (app: AppUnion, index) => (
            <AppCard
              key={index}
              app={app}
              router={props.router}
              shouldLaunchOnClick
            />
          ))}
          {isFiltering && _.isEmpty(filteredApps.yggioApps) && (
            <NoAppsNote>No yggio apps found with filter</NoAppsNote>
          )}
        </AppsContainer>
      </ContainerBox>

      <Apps router={props.router} />

      <HeadingBar>
        <Heading>Marketplace</Heading>
        <SubHeading>Various third party apps</SubHeading>
      </HeadingBar>
      <ContainerBox padding={'0'} margin={'0 0 35px 0'}>
        <AppsContainer>
          {_.map(filteredApps.staticApps, (app: AppUnion, index) => (
            <AppCard
              key={index}
              app={app}
              router={props.router}
            />
          ))}
          {isFiltering && _.isEmpty(filteredApps.staticApps) && (
            <NoAppsNote>No static apps found with filter</NoAppsNote>
          )}
        </AppsContainer>
      </ContainerBox>
    </CenteredPage>
  );
};

const Apps = (props: Props) => {
  const [cursorId, setCursorId] = React.useState<string | null>(null);
  const [cursorDirection, setCursorDirection] = React.useState<string | null>(null);
  const [sortOrder, setSortOrder] = React.useState('name');

  const [pageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);

  const params = {
    limit: pageSize,
    orderBy: sortOrder,
    cursorId,
    cursorDirection,
    matchPattern: {},
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

  return (
    <>
      <HeadingBar>
        <Heading>Installed Apps</Heading>
        <SubHeading>Apps installed from the app store</SubHeading>
      </HeadingBar>
      <ContainerBox padding='0' margin='0 0 70px 0'>
        {_.isEmpty(appsQuery.data?.items) && (
          <AppsContainer>No apps currently installed</AppsContainer>
        )}
        {!_.isEmpty(appsQuery.data?.items) && (
          <AppsContainer>
            <Flex w='100%' justifyContent='flex-end'>
              <Select
                width='200px'
                onChange={evt => setSortOrder(evt.target.value)}
                options={[
                  {value: 'name', label: 'Name ASC'},
                  {value: '!name', label: 'Name DESC'},
                  {value: '_id', label: 'Created ASC'},
                  {value: '!_id', label: 'Created DESC'},
                ]}
                value={sortOrder}
              />
            </Flex>
            {_.map(appsQuery.data?.items, (app: AppUnion) => (
              <AppCard
                key={app._id}
                router={props.router}
                app={app}
              />
            ))}
            {(_.size(appsQuery.data?.items) > 10) && (
              <Flex w='100%' justifyContent='flex-end'>
                <CursorPagination
                  nextId={_.last(appsQuery.data?.items)?._id}
                  prevId={_.head(appsQuery.data?.items)?._id}
                  totalItemsCount={Number(appsQuery.data?.totalCount)}
                  currentItemsCount={_.size(appsQuery.data)}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onChange={handlePageChange}
                />
              </Flex>
            )}
          </AppsContainer>
        )}
      </ContainerBox>
    </>
  );
};

export default AppsPane;
