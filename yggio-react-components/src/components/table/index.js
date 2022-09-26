/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'lodash/fp';
import _ from 'lodash';
import {
  TablePagination,
  RowTable,
  TableError,
  TableLoadingIndicator,
} from './components';
import state from './state';
import {withLanguage, withState} from '../../hocs';
import {
  TableWrapper,
  EmptyTableWrapper,
  StatusTag,
} from './styled';
import {selectPaginatedData} from './selectors';
import {useSelector} from '../../hooks';
import {LABELS} from './constants';
import {SEPARATORS} from '../../constants';

const Table = (
  {
    style,
    labels,
    items,
    isLoading,
    error,
    pageSize = 10, // default pageSize
    currentPage,
    setCurrentPage,
    setTableType,
    TableStyle,
    onClick,
    t,
  }
) => {

  useEffect(() => {
    if (TableStyle) {
      setTableType(TableStyle);
    }
  }, []);

  const data = useSelector({items, pageSize, currentPage}, selectPaginatedData);

  const handleItemClick = item => evt => {
    evt.stopPropagation();
    evt.preventDefault();
    if (item._id) {
      return onClick(item._id)();
    }

    return onClick;
  };
  const createDetails = (item, label) => {
    const itemValue = item[label];
    if (_.eq(label, LABELS.status)) {
      return _.map(itemValue.text, tag => (
        <StatusTag color={itemValue.color} key={tag}>
          {tag}
        </StatusTag>
      ));
    }
    return _.join(SEPARATORS.commaSpace, itemValue);
  };

  if (isLoading) {
    return <TableLoadingIndicator isLoading={isLoading} />;
  }

  if (error) {
    return <TableError error={error} style={style} />;
  }

  if (_.isEmpty(data)) {
    return (
      <EmptyTableWrapper>
        {'No items available'}
      </EmptyTableWrapper>
    );
  }

  return (
    <TableWrapper {...style}>

      <RowTable
        createDetails={createDetails}
        onClick={handleItemClick}
        style={style}
        labels={labels}
        items={data}
        isLoading={isLoading}
        error={error}
        TableStyle={TableStyle}
      />

      <TablePagination
        t={t}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        style={style}
        pageSize={pageSize}
        TableData={data}
        data={items}
      />

    </TableWrapper>
  );
};

Table.propTypes = {
  style: PropTypes.object,
  labels: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  pageSize: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};

export default compose(
  withState(state),
  withLanguage(),
)(Table);
