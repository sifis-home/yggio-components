/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import {TableRow} from '../styled';
import {ERRORS} from '../../../constants';

const TableError = props => (
  <TableRow {...props.style} center>
    {_.isString(props.error)
      ? props.error
      : ERRORS.network}
  </TableRow>
);
TableError.propTypes = {
  error: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default TableError;
