import React, {useState} from 'react';
import _ from 'lodash';
import {NextRouter} from 'next/router';
import {UseQueryResult} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';

// Logic
import {PAGE_SIZES, COLUMNS_SETTINGS} from '../constants';
import {selectDecoratedDevices, selectPageInfo} from '../selectors';
import {Device} from '../../../types';
import {
  rulesApi,
  calculationsApi,
  accessRightsApi,
  ruleButtonsApi,
  getUserId,
  viewApi,
  organizationsApi,
} from '../../../api';


// UI
import {COLORS, VIEW_TYPES} from '../../../constants';
import ContainerBox from '../../../components/container-box';
import CursorPagination from '../../../components/cursor-pagination';
import Spinner from '../../../components/spinner';
import SortButton from '../../../components/sort-button';
import {tableItems} from '.';
import {FlexColCenterMaxWidthWrapper} from '../../../global/styled';
import {
  TableContainer,
  TableItem,
  TableHeadingItem,
  HeadingRow,
  TableRow,
  StyledCheckbox,
  TableFooter,
  TableFooterLeftSection,
  PageInfo,
  PageSizeSelect,
  TableFooterRightSection,
  EmptyTableView,
  BackToPageOneLink,
} from '../styled';

// types
import type {ViewColumn} from '../../../types';
import type {Column} from '../constants';
import type {CursorDirection} from '../../../components/cursor-pagination';

interface TableProps {
  devicesQuery: UseQueryResult<Device[], unknown>;
  numFilteredDevices: number;
  selectedDevices: string[];
  setSelectedDevices: (devices: string[]) => void;
  isInSelectMode: boolean;
  columns: Column[];
  pageSize: number;
  router: NextRouter;
  setPageSize: (size: number) => void;
  sortingOrder: string;
  setSortingOrder: (order: string) => void;
  sortingField: string;
  setSortingField: (field: string) => void;
  currentPage: number;
  onPageChange: (cursorId: string, cursorDirection: CursorDirection, newPage: number) => void;
  resetListState: () => void;
}


const TableSection = (props: TableProps) => {
  const {t} = useTranslation();

  if (props.devicesQuery.isLoading || props.devicesQuery.isFetching) {
    return (
      <EmptyTableView>
        <Spinner color={COLORS.greyMedium} size={26} margin={'0 10px 0 0'} />
        {_.capitalize(t('common.fetching'))} {t('common.devices')}...
      </EmptyTableView>
    );
  }

  if (props.devicesQuery.isError) {
    return (
      <EmptyTableView>
        <FlexColCenterMaxWidthWrapper>
          <b>Could not fetch devices</b>
          <p>{(props.devicesQuery.error as Error).toString()}</p>
          {props.currentPage !== 1 && (
            <BackToPageOneLink onClick={() => props.resetListState()}>
              Go back to page 1
            </BackToPageOneLink>
          )}
        </FlexColCenterMaxWidthWrapper>
      </EmptyTableView>
    );
  }

  if (_.isEmpty(props.devicesQuery.data)) {
    return (
      <EmptyTableView>
        <FlexColCenterMaxWidthWrapper>
          {t('phrases.noDevicesFound')}
          {props.currentPage !== 1 && (
            <BackToPageOneLink onClick={() => props.resetListState()}>
              Go back to page 1
            </BackToPageOneLink>
          )}
        </FlexColCenterMaxWidthWrapper>
      </EmptyTableView>
    );
  }

  return (
    <Table {...props} />
  );
};

const Table = (props: TableProps) => {
  const {t} = useTranslation();

  const organizationsQuery = organizationsApi.useOrganizationsQuery();
  const viewsQuery = viewApi.useViewsQuery<ViewColumn[]>({type: VIEW_TYPES.column});
  const viewsQueries = viewApi.useViewsQueries<ViewColumn[]>({
    type: VIEW_TYPES.column,
    orgIds: organizationsQuery.data?.map(org => org._id),
  });
  const flattenedViewsData = _.compact(_.flatMap(viewsQueries, 'data'));
  const mergedViewsData = _.concat<ViewColumn>(viewsQuery.data!, flattenedViewsData);
  const viewsData = _.uniqBy(mergedViewsData, '_id');

  const userId = getUserId()!;

  const getRulesButtonsQuery = ruleButtonsApi.useRuleButtonsQuery({
    owner: userId,
  });

  const activateRuleMutation = rulesApi.useActivateRule();

  const calculationsQuery = calculationsApi.useCalculationsQuery();
  const accessRightsQuery = accessRightsApi.useAccessRightsSubjectQuery({
    subjectId: userId,
    subjectType: 'user',
    resourceType: 'device',
  });

  const [statusModalDevice, setStatusModalDevice] = useState<string>();

  const decoratedDevices = selectDecoratedDevices({
    devices: props.devicesQuery.data!,
    calculations: calculationsQuery.data,
    accessRights: accessRightsQuery.data,
    ruleButtons: getRulesButtonsQuery.data,
    t,
  });

  const pageInfo = selectPageInfo({
    currentPage: props.currentPage,
    pageSize: props.pageSize,
    devices: props.devicesQuery.data!,
    numFilteredDevices: props.numFilteredDevices,
    t,
  });

  const toggleSelectDevice = (deviceId: string) => {
    const shouldSelect = !_.includes(props.selectedDevices, deviceId);
    if (shouldSelect) {
      const updates = _.concat(props.selectedDevices, deviceId);
      props.setSelectedDevices(updates);
    } else {
      const updates = _.without(props.selectedDevices, deviceId);
      props.setSelectedDevices(updates);
    }
  };

  const handleSelectAllDevices = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {target: {checked}} = evt;
    if (checked) {
      const allDevices = _.map(props.devicesQuery.data, '_id');
      props.setSelectedDevices(allDevices);
    } else {
      props.setSelectedDevices([]);
    }
  };

  const handleSetSorting = (field: string) => () => {
    if (props.sortingOrder === 'asc' && props.sortingField === field) {
      props.setSortingOrder('desc');
    } else {
      props.setSortingOrder('asc');
    }
    props.setSortingField(field);
  };

  return (
    <>
      <TableOptions
        onPageChange={props.onPageChange}
        decoratedDevices={decoratedDevices}
        pageInfo={pageInfo}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        numFilteredDevices={props.numFilteredDevices}
        setPageSize={props.setPageSize}
      />
      <TableContainer isInSelectMode={props.isInSelectMode} columns={props.columns}>
        {props.isInSelectMode && (
          <TableHeadingItem>
            <StyledCheckbox
              type={'checkbox'}
              readOnly
              onChange={handleSelectAllDevices}
              checked={props.selectedDevices.length === decoratedDevices.length}
            />
          </TableHeadingItem>
        )}
        <HeadingRow>
          {_.map(props.columns, column => (
            <TableHeadingItem align={COLUMNS_SETTINGS?.[column]?.align} key={column}>
              {t(`columns.${column}`, {defaultValue: _.capitalize(column)})}
              {COLUMNS_SETTINGS?.[column]?.sortable && (
                <SortButton
                  order={props.sortingField === column ? props.sortingOrder : null}
                  onClick={handleSetSorting(column)}
                  margin={'0 0 0 2px'}
                />
              )}
            </TableHeadingItem>
          ))}
        </HeadingRow>

        {_.map(decoratedDevices, device => (
          <TableRow
            onClick={() => props.isInSelectMode && toggleSelectDevice(device._id)}
            isInSelectMode={props.isInSelectMode}
            isSelected={_.includes(props.selectedDevices, device._id)}
            key={device._id}
          >
            {props.isInSelectMode && (
              <TableItem>
                <StyledCheckbox
                  type={'checkbox'}
                  checked={props.selectedDevices && _.includes(props.selectedDevices, device._id)}
                  readOnly
                />
              </TableItem>
            )}

            {_.map(props.columns, column => (
              <TableItem align={COLUMNS_SETTINGS?.[column]?.align} key={column}>
                {(tableItems[column] || tableItems.custom)({
                  ...props,
                  viewData: _.find(viewsData, {name: column}),
                  device,
                  statusModalDevice,
                  setStatusModalDevice,
                  activateRuleMutation,
                })}
              </TableItem>
            ))}

          </TableRow>
        ))}

      </TableContainer>
      <TableOptions
        onPageChange={props.onPageChange}
        decoratedDevices={decoratedDevices}
        pageInfo={pageInfo}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        numFilteredDevices={props.numFilteredDevices}
        setPageSize={props.setPageSize}
      />
    </>
  );
};

type TableOptionsExtendProps = Pick<
TableProps,
'pageSize' |
'currentPage' |
'numFilteredDevices' |
'setPageSize' |
'onPageChange'
>;

interface TableOptionsProps extends TableOptionsExtendProps {
  pageInfo: string;
  decoratedDevices: Device[];
}

const TableOptions = (props: TableOptionsProps) => {
  const {t} = useTranslation();

  return (
    <TableFooter>
      <TableFooterLeftSection>
        <PageInfo>{props.pageInfo}</PageInfo>
        {_.capitalize(t('titles.itemsPerPage'))}:
        <PageSizeSelect
          value={props.pageSize}
          onChange={evt => {
            const {target: {value}} = evt;
            props.setPageSize(Number(value));
          }}
        >
          {_.map(PAGE_SIZES, pageSize => (
            <option value={pageSize.value} key={pageSize.label}>
              {pageSize.label}
            </option>
          ))}
        </PageSizeSelect>
      </TableFooterLeftSection>
      <TableFooterRightSection>
        <CursorPagination
          nextId={_.last(props.decoratedDevices)?.name}
          prevId={_.head(props.decoratedDevices)?.name}
          currentItemsCount={_.size(props.decoratedDevices)}
          pageSize={props.pageSize}
          currentPage={props.currentPage}
          totalItemsCount={props.numFilteredDevices}
          onChange={props.onPageChange}
        />
      </TableFooterRightSection>
    </TableFooter>
  );
};

const TableWrapper = (props: TableProps) => (
  <ContainerBox padding={'0 0 0 0'}>
    <TableSection {...props} />
  </ContainerBox>
);

export default TableWrapper;
