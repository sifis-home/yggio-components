import React from 'react';
import _ from 'lodash';

import Pagination from '../../pagination';
import {TableFooter} from '../styled';

const TablePagination = (
  {
    pageSize,
    TableData,
    style,
    currentPage,
    data,
    setCurrentPage,
  }
) => (
  <TableFooter>
    {(pageSize && !_.isEmpty(TableData)) && (
      <Pagination
        {...style}
        page={currentPage}
        pageSize={pageSize}
        totalItemsCount={_.size(data)}
        onChangePage={setCurrentPage}
      />
    )}
  </TableFooter>
);

export default TablePagination;
