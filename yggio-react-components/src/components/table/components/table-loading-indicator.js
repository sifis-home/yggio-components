import React from 'react';
import PropTypes from 'prop-types';
import {PendingRow, PendingWrapper} from '../styled';
import Spinner from '../../spinner';

const TableLoadingIndicator = ({isLoading}) => !!isLoading && (
  <PendingWrapper>
    <PendingRow>
      <Spinner size={30} />
    </PendingRow>
  </PendingWrapper>
);

TableLoadingIndicator.propTypes = {
  isLoading: PropTypes.bool,
};

export default TableLoadingIndicator;
