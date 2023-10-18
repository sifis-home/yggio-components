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
