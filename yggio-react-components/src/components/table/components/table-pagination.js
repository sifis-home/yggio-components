/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
