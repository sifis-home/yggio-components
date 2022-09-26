/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';

import {PAGE_SIZES, COLUMNS} from '../constants';
import {capitalizeFirstLetter} from '../utils';
import {COLORS} from '../../../constants';
import ContainerBox from '../../../components/container-box';
// import SortButton from '../../../components/sort-button';
import Pagination from '../../../components/pagination';
import Spinner from '../../../components/spinner';
import tableItems from './table-items';
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
  SetPageSizeContainer,
  PageSizeSelect,
  TableFooterRightSection,
  EmptyTableView,
} from '../styled';
import {FlexColCenterMaxWidthWrapper} from '../../../global/styled';
import {selectDecoratedDevices} from '../selectors';
import {useCalculationResult} from '../queries';

const TableWrapper = props => (
  <ContainerBox padding={'8px 0 0 0'}>
    <TableSection {...props} />
  </ContainerBox>
);

const TableSection = props => {

  const calculationsResult = useCalculationResult();

  const decoratedDevices = selectDecoratedDevices({
    devices: props.devices,
    calculations: calculationsResult.data,
    t: props.t,
  });

  if (props.isLoading || props.isFetching) {
    return (
      <EmptyTableView>
        <Spinner color={COLORS.greyMedium} size={26} margin={'0 10px 0 0'} />
        {_.capitalize(props.t('common.fetching'))} {props.t('common.devices')}...
      </EmptyTableView>
    );
  }

  if (props.error) {
    return (
      <EmptyTableView>
        <FlexColCenterMaxWidthWrapper>
          <b>An error has occured!</b>
          <p>{props.error.toString()}</p>
        </FlexColCenterMaxWidthWrapper>
      </EmptyTableView>
    );
  }

  if (!props.isLoading && _.isEmpty(decoratedDevices)) {
    return (
      <EmptyTableView>
        {props.t('phrases.noDevicesFound')}
      </EmptyTableView>
    );
  }

  return <Table decoratedDevices={decoratedDevices} {...props} />;
};

const Table = props => (
  <>
    <TableOptions {...props} />
    <TableContainer selectMode={props.selectMode} columns={props.columns}>
      {props.selectMode && (
        <TableHeadingItem>
          <StyledCheckbox
            type={'checkbox'}
            readOnly
            onChange={props.handleSelectAllDevices}
            checked={props.selectedDevices.length === props.decoratedDevices.length}
          />
        </TableHeadingItem>
      )}
      <HeadingRow>
        {_.map(props.columns, column => COLUMNS[column] && (
          <TableHeadingItem align={_.get(COLUMNS[column], 'align')} key={column}>
            {props.t(`columns.${column}`)}
            {/*
              TODO: Uncomment when backend sorting has been fixed
              {COLUMNS[column].sortable && (
                <SortButton
                  order={props.sortingField === column ? props.sortingOrder : null}
                  onClick={props.handleSetSorting(column)}
                  margin={'0 0 0 2px'}
                />
              )}
            */}
          </TableHeadingItem>
        ))}
      </HeadingRow>

      {_.map(props.decoratedDevices, device => (
        <TableRow
          onClick={() => props.selectMode && props.setDeviceSelected({
            deviceId: device._id,
            selected: !_.includes(props.selectedDevices, device._id)
          })}
          selectMode={props.selectMode}
          isSelected={_.includes(props.selectedDevices, device._id)}
          key={device._id}
        >
          {props.selectMode && (
            <TableItem>
              <StyledCheckbox
                type={'checkbox'}
                checked={props.selectedDevices && _.includes(props.selectedDevices, device._id)}
                readOnly
              />
            </TableItem>
          )}

          {_.map(props.columns, column => COLUMNS[column] && (
            <TableItem align={_.get(COLUMNS[column], 'align')} key={column}>
              {
                tableItems[capitalizeFirstLetter(column)]
                  ? tableItems[capitalizeFirstLetter(column)]({...props, device})
                  : 'DevErr'
              }
            </TableItem>
          ))}

        </TableRow>
      ))}

    </TableContainer>
    <TableOptions {...props} />
  </>
);

const TableOptions = props => (
  <TableFooter>
    <TableFooterLeftSection>
      <PageInfo>{props.pageInfo}</PageInfo>
      <SetPageSizeContainer>{_.capitalize(props.t('titles.itemsPerPage'))}:</SetPageSizeContainer>
      <PageSizeSelect
        value={props.pageSize}
        onChange={props.handleSetPageSize}
      >
        {_.map(PAGE_SIZES, pageSize => (
          <option value={pageSize.value} key={pageSize.label}>
            {pageSize.label}
          </option>
        ))}
      </PageSizeSelect>
    </TableFooterLeftSection>
    <TableFooterRightSection>
      <Pagination
        t={props.t}
        pageSize={Number(props.pageSize)}
        page={props.currentPage}
        totalItemsCount={Number(props.numFilteredDevices)}
        onChange={props.setCurrentPage}
      />
    </TableFooterRightSection>
  </TableFooter>
);

export default TableWrapper;
