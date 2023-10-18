/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
